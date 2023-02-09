export type LightType<TOutput, TInput = TOutput> = {
  parse(input: TInput): TOutput
}
export type LightObject<
  TKey extends string = string,
  TLightType extends LightType<unknown, unknown> = LightType<unknown, unknown>
> = Record<TKey, TLightType>
