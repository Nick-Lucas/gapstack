import { InternalContext } from '../context/Context'

export interface TypeInner<TInput, TOutput = TInput> {
  parse(input: unknown, ctx: InternalContext): TOutput
}
