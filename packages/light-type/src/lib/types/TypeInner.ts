import { InternalContext } from '../context/Context'

/** @internal this API may change without notice */
export interface TypeInner<TInput, TOutput = TInput> {
  parse(input: unknown, ctx: InternalContext): TOutput
}
