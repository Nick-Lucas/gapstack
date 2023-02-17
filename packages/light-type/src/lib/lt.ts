import { ChainableType } from './chainable/ChainableType'
import { InferInput, InferOutput, LightType } from './types/LightType'
import { AnyLightArrayElement, AnyLightObject } from './types/LightObject'
import { Primitive, LiteralBase, AnyKey } from './types/utils'
import { ChainableObject } from './chainable/ChainableObject'
import { LightTypeError } from './errors/LightTypeError'
import { ChainableArray } from './chainable/ChainableArray'
import {
  LightTypeAggregatedErrors,
  LightTypeErrorAggregator,
} from './errors/LightTypeAggregatedErrors'
import { AnyTupleInput, AnyUnionInput } from './types/creators'
import { createPipeFunction } from './types/pipes'

// TODO: add .implements method to enforce recreation of deep TS type

// TODO: extend all types with validations

export function object<TLightObject extends AnyLightObject>(
  lightObject: TLightObject
) {
  return new ChainableObject<TLightObject>(lightObject)
}

export function array<TLightArrayElement extends AnyLightArrayElement>(
  valueType: TLightArrayElement
) {
  return new ChainableArray<TLightArrayElement>(valueType)
}

export function any() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new ChainableType<any, any>({
    parse(input) {
      return input
    },
  })
}

export function unknown() {
  return new ChainableType<unknown, unknown>({
    parse(input) {
      return input
    },
  })
}

export function boolean() {
  return new ChainableType<boolean, boolean>({
    parse(input) {
      if (typeof input === 'boolean') {
        return input
      }

      throw new LightTypeError({
        message: `Not a Boolean`,
        value: input,
      })
    },
  })
}

export function number() {
  return new ChainableType<number, number>({
    parse(input) {
      if (typeof input === 'number') {
        return input
      }

      throw new LightTypeError({
        message: `Not a Number`,
        value: input,
      })
    },
  })
}

export function string() {
  return new ChainableType<string, string>({
    parse(input) {
      if (typeof input === 'string') {
        return input
      }

      throw new LightTypeError({
        message: `Not a String`,
        value: input,
      })
    },
  })
}

export function date() {
  return new ChainableType<Date, Date>({
    parse(input) {
      if (input instanceof Date) {
        return input
      }

      throw new LightTypeError({
        message: `Not a Date`,
        value: input,
      })
    },
  })
}

export function literal<TLiteral extends Primitive>(
  literal: TLiteral | readonly TLiteral[]
) {
  const values = new Set(Array.isArray(literal) ? literal : [literal])
  const list = Array.from(values).join(', ')

  return new ChainableType<LiteralBase<TLiteral>, TLiteral>({
    parse(input: unknown) {
      if (values.has(input as TLiteral)) {
        return input as TLiteral
      }

      throw new LightTypeError({
        message: `Does not match literal, expected one of: ${list}`,
        value: input,
      })
    },
  })
}

export function record<
  TKey extends LightType<AnyKey>,
  TValue extends LightType<unknown>
>(key: TKey, value: TValue) {
  type KeyInput = InferInput<TKey>
  type KeyOutput = InferInput<TKey>
  type ValueInput = InferInput<TValue>
  type ValueOutput = InferInput<TValue>

  type TInput = Record<KeyInput, ValueInput>
  type TOutput = Record<KeyOutput, ValueOutput>

  return new ChainableType<TInput, TOutput>({
    parse(input) {
      if (typeof input === 'object' && input !== null) {
        const maybeTInput = input as TInput
        const errors = new LightTypeErrorAggregator()

        const inputKeys = Object.keys(maybeTInput) as KeyInput[]

        const result = {} as TOutput
        for (let i = 0; i < inputKeys.length; i++) {
          errors.aggregate(String(inputKeys[i]), () => {
            const outputKey = key.parse(inputKeys[i]) as KeyOutput

            result[outputKey] = value.parse(
              maybeTInput[inputKeys[i]]
            ) as ValueOutput
          })
        }
        errors.throwIfAny()

        return result
      }

      throw new LightTypeError({
        message: 'Not a Record',
        value: input,
      })
    },
  })
}

export function map<
  TKey extends LightType<AnyKey>,
  TValue extends LightType<unknown>
>(key: TKey, value: TValue) {
  type KeyInput = InferInput<TKey>
  type KeyOutput = InferInput<TKey>
  type ValueInput = InferInput<TValue>
  type ValueOutput = InferInput<TValue>

  type TInput = Map<KeyInput, ValueInput> | Record<KeyInput, ValueInput>
  type TOutput = Map<KeyOutput, ValueOutput>

  return new ChainableType<TInput, TOutput>({
    parse(_input) {
      const input =
        _input instanceof Map
          ? (Object.fromEntries(_input) as Record<KeyInput, ValueInput>)
          : _input

      if (typeof input === 'object' && input !== null) {
        const maybeTInput = input as TInput
        const errors = new LightTypeErrorAggregator()

        const inputKeys = Object.keys(maybeTInput) as (keyof TInput)[]

        const result = new Map() as TOutput
        for (let i = 0; i < inputKeys.length; i++) {
          errors.aggregate(String(inputKeys[i]), () => {
            result.set(
              key.parse(inputKeys[i]) as KeyOutput,
              value.parse(maybeTInput[inputKeys[i]]) as ValueOutput
            )
          })
        }
        errors.throwIfAny()

        return result
      }

      throw new LightTypeError({
        message: 'Not a Map or Object',
        value: input,
      })
    },
  })
}

export function tuple<T extends AnyTupleInput>(tuple: T) {
  type TInput = {
    [K in keyof T]: InferInput<T[K]>
  }
  type TOutput = {
    [K in keyof T]: InferOutput<T[K]>
  }

  return new ChainableType<TInput, TOutput>({
    parse(input) {
      if (Array.isArray(input)) {
        if (input.length !== tuple.length) {
          throw new LightTypeError({
            message: `Invalid Tuple: ${input.length} elements instead of ${tuple.length}`,
            value: input,
          })
        }

        const errors = new LightTypeErrorAggregator()
        const result = new Array(tuple.length) as TOutput
        for (let i = 0; i < tuple.length; i++) {
          errors.aggregate(String(i), () => {
            result[i] = tuple[i].parse(input[i])
          })
        }

        errors.throwIfAny()

        return result
      }

      throw new LightTypeError({
        message: `Not a Tuple`,
        value: input,
      })
    },
  })
}

export function union<T extends AnyUnionInput>(types: T) {
  //TODO: could these types be moved upward by genericising UnionInput?
  type TInput = {
    [key in keyof T]: InferInput<T[key]>
  }[number]
  type TOutput = {
    [key in keyof T]: InferOutput<T[key]>
  }[number]

  return new ChainableType<TInput, TOutput>({
    parse(input) {
      for (const type of types) {
        try {
          return type.parse(input) as TOutput
        } catch (e) {
          if (
            e instanceof LightTypeError ||
            e instanceof LightTypeAggregatedErrors
          ) {
            // We're looking for a successful type
            continue
          } else {
            throw e
          }
        }
      }

      throw new LightTypeError({
        // TODO: include some sort of aggregated errors in this from the various options
        message: 'No Matching Type in Union',
        value: input,
      })
    },
  })
}

export function set<TInput, TOutput>(valueType: LightType<TInput, TOutput>) {
  return new ChainableType<TInput[] | Set<TInput>, Set<TOutput>>({
    parse(_input) {
      let input = [] as TInput[]
      if (_input instanceof Set) {
        input = Array.from(_input)
      } else {
        input = _input as TInput[]
      }

      if (Array.isArray(input)) {
        const errors = new LightTypeErrorAggregator()
        const result = new Set<TOutput>()

        for (let i = 0; i < input.length; i++) {
          errors.aggregate(String(i), () => {
            result.add(valueType.parse(input[i]))
          })
        }

        errors.throwIfAny()

        return result
      }

      throw new LightTypeError({
        message: `Not a Set or Arraylike`,
        value: input,
      })
    },
  })
}

export function before<
  TBeforeResult,
  TType extends LightType<
    TBeforeResult extends Primitive
      ? LiteralBase<TBeforeResult>
      : TBeforeResult,
    unknown
  >
>(preprocess: (input: unknown) => TBeforeResult, type: TType) {
  return new ChainableType<unknown, InferOutput<TType>>({
    parse(input) {
      const processedInput = preprocess(input)

      return type.parse(processedInput) as InferOutput<TType>
    },
  })
}

export const pipe = createPipeFunction(unknown())
