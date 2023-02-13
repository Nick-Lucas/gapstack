import { AnyLightObject } from './types/LightObject'
import { Simplify } from './types/utils'

/**
 * Merge B onto A and return, replacing conflicting keys
 */
export type MergeLightObjects<
  A extends AnyLightObject,
  B extends AnyLightObject
> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : never
}

/**
 * Merge B onto A and return, replacing conflicting keys
 */
export function mergeLightObjects<
  A extends AnyLightObject,
  B extends AnyLightObject
>(a: A, b: B) {
  return {
    ...a,
    ...b,
  } as Simplify<MergeLightObjects<A, B>>
}
