export interface LightType<TInput, TOutput = TInput> {
  readonly _input: TInput
  readonly _output: TOutput

  parse(input: unknown): TOutput
  check(input: TInput): TOutput
}

export type AnyLightType = LightType<unknown, unknown>

// TODO: is the second/recursive branch here really needed?
export type InferInput<TLightType extends LightType<unknown>> =
  TLightType extends LightType<infer T, unknown>
    ? T extends LightType<unknown>
      ? InferInput<T>
      : T
    : never

export type InferOutput<TLightType extends LightType<unknown>> =
  TLightType extends LightType<unknown, infer T>
    ? T extends LightType<unknown>
      ? InferOutput<T>
      : T
    : never
