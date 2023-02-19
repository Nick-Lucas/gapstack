import { Assertion } from './assert'

export function min(min: number): Assertion<number> {
  return (input, ctx) => {
    if (input < min) {
      ctx.issue({
        message: 'Min Value is ' + min,
        value: min,
      })
    }

    return input
  }
}

export function max(max: number): Assertion<number> {
  return (input, ctx) => {
    if (input > max) {
      ctx.issue({
        message: 'Max Value is ' + max,
        value: max,
      })
    }

    return input
  }
}
