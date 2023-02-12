import { LightType } from './LightType'

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
