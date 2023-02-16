import { LightType } from './LightType'

export type AnyTupleInput = [LightType<unknown>, ...LightType<unknown>[]]

export type AnyUnionInput = [
  LightType<unknown>,
  LightType<unknown>,
  ...LightType<unknown>[]
]
