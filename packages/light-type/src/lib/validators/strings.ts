import { Assertion } from './assert'

export function min(characters: number): Assertion<string> {
  return (input, ctx) => {
    if (input.length < characters) {
      ctx.addIssue({
        type: 'min',
        message: 'Min Length is ' + characters,
        value: characters,
      })
    }

    return input
  }
}

export function max(characters: number): Assertion<string> {
  return (input, ctx) => {
    if (input.length > characters) {
      ctx.addIssue({
        type: 'max',
        message: 'Max Length is ' + characters,
        value: characters,
      })
    }

    return input
  }
}

export function length(characters: number): Assertion<string> {
  return (input, ctx) => {
    if (input.length !== characters) {
      ctx.addIssue({
        type: 'length',
        message: 'Expected Length is ' + characters,
        value: input,
      })
    }

    return input
  }
}
