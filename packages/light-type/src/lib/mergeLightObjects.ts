import { LightObject } from './base-types'
import { Simplify } from './util-types'

/**
 * Merge B onto A and return, replacing conflicting keys
 */
export type MergeLightObjects<A extends LightObject, B extends LightObject> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : never
}

/**
 * Merge B onto A and return, replacing conflicting keys
 */
export function mergeLightObjects<A extends LightObject, B extends LightObject>(
  a: A,
  b: B
) {
  return {
    ...a,
    ...b,
  } as Simplify<MergeLightObjects<A, B>>
}
