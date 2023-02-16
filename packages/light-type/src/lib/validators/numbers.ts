import { LightTypeError } from '../errors/LightTypeError'
import { Assertion } from './assert'

export function min(min: number): Assertion<number> {
  return (input) => {
    if (input < min) {
      throw new LightTypeError({
        message: 'Min Value is ' + min,
        value: min,
      })
    }

    return input
  }
}

export function max(max: number): Assertion<number> {
  return (input) => {
    if (input > max) {
      throw new LightTypeError({
        message: 'Max Value is ' + max,
        value: max,
      })
    }

    return input
  }
}
