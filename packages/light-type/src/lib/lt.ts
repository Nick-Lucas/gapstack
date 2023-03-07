import { LtType, LtTypeAnyKey } from './chainable/LtType'
import { AnyLightType, LightType } from './types/LightType'
import { AnyLightObject } from './types/LightObject'
import { Primitive, AnyKey } from './types/utils'

import { AnyTupleInput, AnyUnionInput } from './types/creators'
import { createPipeFunction } from './types/pipes'
import {
  LtObject,
  LtArray,
  LtMap,
  LtRecord,
  LtSet,
  LtTuple,
  LtUnion,
  LtNumber,
  LtString,
  LtBoolean,
  LtLiteral,
} from './chainable'

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
export function array<TLightArrayElement extends LtType>(
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
  return LtType.createType<any, any>({
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
  return LtType.createType<unknown, unknown>({
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
  return LtBoolean.create()
}

/**
 * Validate a typescript `number` type
 *
 * ```ts
 * const myNumber = lt.number()
 * ```
 */
export function number() {
  return LtNumber.create()
}

/**
 * Validate a typescript `string` type
 *
 * ```ts
 * const myString = lt.string()
 * ```
 */
export function string() {
  return LtString.create()
}

/**
 * Validate a typescript `Date` type
 *
 * ```ts
 * const myDate = lt.date()
 * ```
 */
export function date() {
  return LtType.createType<Date, Date>({
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
  return LtLiteral.create(literal)
}

/**
 * Validate a typescript `Record<K, V>`
 *
 * ```ts
 * const record = lt.record(lt.string(), lt.number())
 * // `Record<string, number>`
 * ```
 */
export function record<TKey extends LtTypeAnyKey, TValue extends LtType>(
  key: TKey,
  value: TValue
) {
  return LtRecord.create(key, value)
}

/**
 * Validate a typescript `Map<K, V>`
 *
 * ```ts
 * const map = lt.map(lt.string(), lt.number())
 * // `Map<string, number>`
 * ```
 */
export function map<TKey extends LtTypeAnyKey, TValue extends LtType>(
  key: TKey,
  value: TValue
) {
  return LtMap.create(key, value)
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
  return LtTuple.create(tuple)
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
  return LtUnion.create(types)
}

/**
 * Validate a typescript `Set<T>`
 *
 * ```ts
 * const set = lt.set(lt.string())
 * // `Set<string>`
 * ```
 */
export function set<TInput, TOutput>(valueType: LtType<TInput, TOutput>) {
  return LtSet.create(valueType)
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
