import { LightType } from './LightType'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyLightObject = Record<string, LightType<any, any>>

export type InferLightObjectOutput<TDef extends AnyLightObject> = {
  [key in keyof TDef]: TDef[key] extends LightType<unknown, infer T> ? T : never
}

export type InferLightObjectInput<TDef extends AnyLightObject> = {
  [key in keyof TDef]: TDef[key] extends LightType<infer T, unknown> ? T : never
}
