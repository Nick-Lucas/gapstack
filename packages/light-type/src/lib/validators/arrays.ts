import { Assertion } from './assert'

export function min(elements: number): Assertion<unknown[]> {
  return (input, ctx) => {
    if (input.length < elements) {
      ctx.addIssue({
        type: 'min',
        message: 'Min Length is ' + elements,
        value: elements,
      })
    }

    return input
  }
}

export function max(elements: number): Assertion<unknown[]> {
  return (input, ctx) => {
    if (input.length > elements) {
      ctx.addIssue({
        type: 'max',
        message: 'Max Length is ' + elements,
        value: elements,
      })
    }

    return input
  }
}

export function length(elements: number): Assertion<unknown[]> {
  return (input, ctx) => {
    if (input.length !== elements) {
      ctx.addIssue({
        type: 'length',
        message: 'Expected Length is ' + elements,
        value: input,
      })
    }

    return input
  }
}
