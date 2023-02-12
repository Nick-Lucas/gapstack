// eslint-disable-next-line @typescript-eslint/ban-types
export type NoOp = {}

export type Primitive = string | number | boolean
export type AnyKey = string | number | symbol

/**
 * Determine the primitive types included in a literal union
 */
export type LiteralBase<T extends Primitive> =
  | (T extends string ? string : never)
  | (T extends number ? number : never)
  | (T extends boolean ? boolean : never)

/**
 * Materialises a complex/generic type into a simple/raw type for compiler output and autocomplete
 */
export type Simplify<T> = {
  [K in keyof T]: T[K]
} & NoOp