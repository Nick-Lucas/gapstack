// eslint-disable-next-line @typescript-eslint/ban-types
export type NoOp = {}

export type Primitive = string | number | boolean

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
  [KeyType in keyof T]: T[KeyType]
} & NoOp
