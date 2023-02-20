//
// Typer Inner Defs
//
type DType = 'string' | 'number'
interface TypeInnerCreator<A, B> {
  type: DType
  parse(input: A, ctx: any): B
}
export interface TypeInner<A, B> extends TypeInnerCreator<A, B> {
  readonly _input: A
  readonly _output: B
}
export type AnyInner = TypeInner<unknown, unknown>
export function inner<A, B>(t: TypeInnerCreator<A, B>): TypeInner<A, B> {
  return t as TypeInner<A, B>
}
