//
// Light Type

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

//
// Light object

export type LightObject<
  TKey extends string = string,
  TLightType extends LightType<unknown, unknown> = LightType<unknown, unknown>
> = Record<TKey, TLightType>

export type InferLightObjectOutput<TDef extends LightObject> = {
  [key in keyof TDef]: TDef[key] extends LightType<unknown, infer T> ? T : never
}

export type InferLightObjectInput<TDef extends LightObject> = {
  [key in keyof TDef]: TDef[key] extends LightType<infer T, unknown> ? T : never
}
