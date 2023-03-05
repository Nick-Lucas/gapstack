import { Assertion } from './assert'

export function min<T>(min: number): Assertion<T[]> {
  return (input, ctx) => {
    if (input.length < min) {
      ctx.addIssue({
        type: 'min',
        message: 'Min Length is ' + min,
        value: input,
      })
    }

    return input
  }
}

export function max<T>(max: number): Assertion<T[]> {
  return (input, ctx) => {
    if (input.length > max) {
      ctx.addIssue({
        type: 'max',
        message: 'Max Length is ' + max,
        value: input,
      })
    }

    return input
  }
}

export function length<T>(length: number): Assertion<T[]> {
  return (input, ctx) => {
    if (input.length !== length) {
      ctx.addIssue({
        type: 'length',
        message: 'Expected Length is ' + length,
        value: input,
      })
    }

    return input
  }
}
