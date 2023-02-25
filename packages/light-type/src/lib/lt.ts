import { LtType } from './chainable/LtType'
import {
  AnyLightType,
  InferInput,
  InferOutput,
  LightType,
} from './types/LightType'
import { AnyLightObject } from './types/LightObject'
import { Primitive, LiteralBase, AnyKey } from './types/utils'
import { LtObject } from './chainable/LtObject'
import { LtArray } from './chainable/LtArray'

import { AnyTupleInput, AnyUnionInput } from './types/creators'
import { createPipeFunction } from './types/pipes'
import { Context } from './context/Context'
import { LtString } from './chainable/LtString'
import { LtNumber } from './chainable/LtNumber'

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
  return LtObject.create(lightObject)
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
export function array<TLightArrayElement extends AnyLightType>(
  elementType: TLightArrayElement
) {
  return LtArray.create(elementType)
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
  return new LtType<any, any>({
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
  return new LtType<unknown, unknown>({
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
  return new LtType<boolean, boolean>({
    parse(input, ctx) {
      if (typeof input === 'boolean') {
        return input
      }

      ctx.addIssue({
        type: 'required',
        message: `Not a Boolean`,
        value: input,
      })

      return ctx.NEVER
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
  return new LtNumber({
    parse(input, ctx) {
      if (typeof input === 'number') {
        return input
      }

      ctx.addIssue({
        type: 'required',
        message: `Not a Number`,
        value: input,
      })

      return ctx.NEVER
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
  return new LtString({
    parse(input, ctx) {
      if (typeof input === 'string') {
        return input
      }

      ctx.addIssue({
        type: 'required',
        message: `Not a String`,
        value: input,
      })

      return ctx.NEVER
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
  return new LtType<Date, Date>({
    parse(input, ctx) {
      if (input instanceof Date && !isNaN(input.valueOf())) {
        return input
      }

      ctx.addIssue({
        type: 'required',
        message: `Not a Date`,
        value: input,
      })

      return ctx.NEVER
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

  return new LtType<LiteralBase<TLiteral>, TLiteral>({
    parse(input: unknown, ctx) {
      if (values.has(input as TLiteral)) {
        return input as TLiteral
      }

      ctx.addIssue({
        type: 'required',
        message: `Does not match literal, expected one of: ${list}`,
        value: input,
      })

      return ctx.NEVER
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

  return new LtType<TInput, TOutput>({
    parse(input, ctx) {
      if (typeof input === 'object' && input !== null) {
        const maybeTInput = input as TInput

        const inputKeys = Object.keys(maybeTInput) as KeyInput[]

        const result = {} as TOutput
        for (let i = 0; i < inputKeys.length; i++) {
          const innerCtx = ctx.createChild(String(inputKeys[i]))

          const outputKey = key._t.parse(inputKeys[i], innerCtx) as KeyOutput

          result[outputKey] = value._t.parse(
            maybeTInput[inputKeys[i]],
            innerCtx
          ) as ValueOutput
        }

        return result
      }

      ctx.addIssue({
        type: 'required',
        message: 'Not a Record',
        value: input,
      })

      return ctx.NEVER
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

  return new LtType<TInput, TOutput>({
    parse(_input, ctx) {
      const input =
        _input instanceof Map
          ? (Object.fromEntries(_input) as Record<KeyInput, ValueInput>)
          : _input

      if (typeof input === 'object' && input !== null) {
        const maybeTInput = input as TInput

        const inputKeys = Object.keys(maybeTInput) as (keyof TInput)[]

        const result = new Map() as TOutput
        for (let i = 0; i < inputKeys.length; i++) {
          const innerContext = ctx.createChild(String(inputKeys[i]))

          result.set(
            key._t.parse(inputKeys[i], innerContext) as KeyOutput,
            value._t.parse(
              maybeTInput[inputKeys[i]],
              innerContext
            ) as ValueOutput
          )
        }

        return result
      }

      ctx.addIssue({
        type: 'required',
        message: 'Not a Map or Object',
        value: input,
      })

      return ctx.NEVER
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

  return new LtType<TInput, TOutput>({
    parse(input, ctx) {
      if (Array.isArray(input)) {
        if (input.length !== tuple.length) {
          ctx.addIssue({
            type: 'length',
            message: `Invalid Tuple: ${input.length} elements instead of ${tuple.length}`,
            value: input,
          })
        }
        const result = new Array(tuple.length) as TOutput
        for (let i = 0; i < tuple.length; i++) {
          const innerContext = ctx.createChild(String(i))
          result[i] = tuple[i]._t.parse(input[i], innerContext)
        }

        return result
      }

      ctx.addIssue({
        type: 'required',
        message: `Not a Tuple`,
        value: input,
      })

      return ctx.NEVER
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

  return new LtType<TInput, TOutput>({
    parse(input, ctx) {
      for (const type of types) {
        const specialContext = new Context()

        const result = type._t.parse(input, specialContext) as TOutput
        if (specialContext.anyIssue()) {
          // We go until we get one without any validation errors
          continue
        }

        return result
      }

      // TODO: maybe can give more details on why no type was matched?
      ctx.addIssue({
        type: 'required',
        message: 'No Matching Type in Union',
        value: input,
      })

      return ctx.NEVER
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
  return new LtType<TInput[] | Set<TInput>, Set<TOutput>>({
    parse(_input, ctx) {
      let input = [] as TInput[]
      if (_input instanceof Set) {
        input = Array.from(_input)
      } else {
        input = _input as TInput[]
      }

      if (Array.isArray(input)) {
        const result = new Set<TOutput>()

        for (let i = 0; i < input.length; i++) {
          const innerContext = ctx.createChild(String(i))
          result.add(valueType._t.parse(input[i], innerContext))
        }

        return result
      }

      ctx.addIssue({
        type: 'required',
        message: `Not a Set or Arraylike`,
        value: input,
      })

      return ctx.NEVER
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
