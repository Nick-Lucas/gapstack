export interface TypeInner<TInput, TOutput = TInput> {
  parse(input: unknown): TOutput
}
