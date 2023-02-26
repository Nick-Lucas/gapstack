import { LtType } from '../chainable'
import { AnyLightType, LightType } from './LightType'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NoOp = {}

export type Primitive = string | number | boolean
export type AnyKey = string | number | symbol

/**
 * Determine the primitive types included in a literal union
 */
export type LiteralBase<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends symbol
  ? symbol
  : T

/**
 * Sometimes (like during piping) TypeScript can get a little too
 * aggressive about what it wants, and we need a way to curtail this.
 *
 * This type helps
 */
export type SoftenInput<T> = T extends Record<AnyKey, unknown>
  ?
      | {
          [key in keyof T]?: T[key] extends LtType<infer TInput, infer TOutput>
            ? LtType<SoftenInput<TInput>, TOutput>
            : SoftenInput<T[key]>
        }
      | null
      | undefined
  : LiteralBase<T> | null | undefined

/**
 * Materialises a complex/generic type into a simple/raw type for compiler output and autocomplete
 */
export type Simplify<T> = {
  [K in keyof T]: T[K]
} & NoOp
