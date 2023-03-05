import { Assertion } from './assert'

export function min(characters: number): Assertion<string> {
  return (input, ctx) => {
    if (input.length < characters) {
      ctx.addIssue({
        type: 'min',
        message: 'Min Length is ' + characters,
        value: input,
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
        value: input,
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

export function includes(text: string): Assertion<string> {
  return (input, ctx) => {
    if (input.includes(text) === false) {
      ctx.addIssue({
        type: 'includes',
        message: 'Expected string to include: ' + text,
        value: input,
      })
    }

    return input
  }
}

export function startsWith(text: string): Assertion<string> {
  return (input, ctx) => {
    if (input.startsWith(text) === false) {
      ctx.addIssue({
        type: 'startsWith',
        message: 'Expected string to start with: ' + text,
        value: input,
      })
    }

    return input
  }
}

export function endsWith(text: string): Assertion<string> {
  return (input, ctx) => {
    if (input.endsWith(text) === false) {
      ctx.addIssue({
        type: 'endsWith',
        message: 'Expected string to end with: ' + text,
        value: input,
      })
    }

    return input
  }
}

export function regex(regex: RegExp): Assertion<string> {
  return (input, ctx) => {
    if (regex.test(input) === false) {
      ctx.addIssue({
        type: 'regex',
        message: 'Expected string to match: ' + String(regex),
        value: input,
      })
    }

    return input
  }
}
