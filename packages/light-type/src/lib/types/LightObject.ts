import { LightType } from './LightType'

export type AnyLightObject = Record<string, LightType<unknown, unknown>>

export type AnyLightArrayElement = LightType<unknown, unknown>

export type InferLightObjectOutput<TDef extends AnyLightObject> =
  ApplyOptionals<{
    [key in keyof TDef]: TDef[key] extends LightType<unknown, infer T>
      ? T
      : never
  }>

export type InferLightObjectInput<TDef extends AnyLightObject> =
  ApplyOptionals<{
    [key in keyof TDef]: TDef[key] extends LightType<infer T, unknown>
      ? T
      : never
  }>

type UndefinedToOptional<Input> = {
  [K in keyof Input as undefined extends Input[K] ? K : never]?: Input[K]
}

type ApplyOptionals<Input> = Omit<Input, keyof UndefinedToOptional<Input>> &
  UndefinedToOptional<Input>
