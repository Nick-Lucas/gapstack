import { Context } from '../errors/IssueContext'

export interface TypeInner<TInput, TOutput = TInput> {
  parse(input: unknown, context: Context): TOutput
}
