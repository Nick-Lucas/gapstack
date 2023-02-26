export interface LightType<TInput, TOutput = TInput> {
  readonly _input: TInput
  readonly _output: TOutput

  parse(input: unknown): TOutput
  check(input: TInput): TOutput
}

export type AnyLightType = LightType<unknown, unknown>

export type InferInput<TLightType extends LightType<unknown>> =
  TLightType extends LightType<infer T, unknown> ? T : never

export type InferOutput<TLightType extends LightType<unknown>> =
  TLightType extends LightType<unknown, infer T> ? T : never
