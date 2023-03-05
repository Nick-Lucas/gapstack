import { Assertion } from './assert'

export function min(min: number): Assertion<number> {
  return (input, ctx) => {
    if (input < min) {
      ctx.addIssue({
        type: 'min',
        message: 'Min Value is ' + min,
        value: input,
      })
    }

    return input
  }
}

export function max(max: number): Assertion<number> {
  return (input, ctx) => {
    if (input > max) {
      ctx.addIssue({
        type: 'max',
        message: 'Max Value is ' + max,
        value: input,
      })
    }

    return input
  }
}
