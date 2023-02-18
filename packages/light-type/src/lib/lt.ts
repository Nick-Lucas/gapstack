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

/**
 * Validate an object type with a given shape:
 *
 * ```ts
 * const myObject = lt.object({
 *   id: lt.number(),
 *   name: lt.string()
 * })
 * ```
 */
export function object<TLightObject extends AnyLightObject>(
  lightObject: TLightObject
) {
  return ChainableObject.create<TLightObject>(lightObject)
}

/**
 * Validate an array with a given element type:
 *
 * ```ts
 * const arrayOfNumbers = lt.array(lt.number())
 *
 * const arrayOfObjects = lt.array(lt.object({ ...etc... }))
 * ```
 */
export function array<TLightArrayElement extends AnyLightArrayElement>(
  valueType: TLightArrayElement
) {
  return new ChainableArray<TLightArrayElement>(valueType)
}

/**
 * Validate a typescript `any` type
 *
 * ```ts
 * const myAny = lt.any()
 * ```
 */
export function any() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new ChainableType<any, any>({
    parse(input) {
      return input
    },
  })
}

/**
 * Validate a typescript `unknown` type
 *
 * ```ts
 * const myUnknown = lt.unknown()
 * ```
 */
export function unknown() {
  return new ChainableType<unknown, unknown>({
    parse(input) {
      return input
    },
  })
}

/**
 * Validate a typescript `boolean` type
 *
 * ```ts
 * const myBoolean = lt.boolean()
 * ```
 */
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

/**
 * Validate a typescript `number` type
 *
 * ```ts
 * const myNumber = lt.number()
 * ```
 */
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

/**
 * Validate a typescript `string` type
 *
 * ```ts
 * const myString = lt.string()
 * ```
 */
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

/**
 * Validate a typescript `Date` type
 *
 * ```ts
 * const myDate = lt.date()
 * ```
 */
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

/**
 * Validate a typescript literal. Any valid typescript literal is supported
 *
 * ```ts
 * // Create a simple literal
 * const foo = lt.literal('foo')
 * const one = lt.literal(1)
 * const trueBool = lt.literal(true)
 *
 * // Create a literal union
 * const foobar = lt.literal(['foo', 'bar'])
 * const onebar = lt.literal([1, 'bar'])
 * ```
 */
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

/**
 * Validate a typescript `Record<K, V>`
 *
 * ```ts
 * const record = lt.record(lt.string(), lt.number())
 * // `Record<string, number>`
 * ```
 */
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

/**
 * Validate a typescript `Map<K, V>`
 *
 * ```ts
 * const map = lt.map(lt.string(), lt.number())
 * // `Map<string, number>`
 * ```
 */
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

/**
 * Validate a typescript tuple type
 *
 * ```ts
 * const tuple = lt.tuple([lt.string(), lt.number(), lt.number()])
 * // `[string, number, number]`
 * ```
 */
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

/**
 * Validate a typescript union type
 *
 * ```ts
 * const union = lt.union([lt.string(), lt.number()])
 * // `string | number`
 *
 * const objectUnion = lt.union([object1, object2])
 * // `object1 | object2`
 * ```
 */
export function union<T extends AnyUnionInput>(types: T) {
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

/**
 * Validate a typescript `Set<T>`
 *
 * ```ts
 * const set = lt.set(lt.string())
 * // `Set<string>`
 * ```
 */
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

/**
 * Set up a 'Pipe' which chains together functors and types, and generates a new type output
 *
 * ```ts
 * const datePipe = lt.pipe(lt.string(), transformStringToDate, lt.date())
 * // `unknown -> Date`
 * ```
 */
export const pipe = createPipeFunction(unknown())
