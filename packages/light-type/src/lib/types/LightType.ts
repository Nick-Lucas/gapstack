export type LightType<TInput, TOutput = TInput> = {
  parse(input: TInput): TOutput
}

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
