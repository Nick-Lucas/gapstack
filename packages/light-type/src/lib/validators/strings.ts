import { Assertion } from './assert'

export function min(characters: number): Assertion<string> {
  return (input, issueContext) => {
    if (input.length < characters) {
      issueContext.issue({
        message: 'Min Length is ' + characters,
        value: characters,
      })
    }

    return input
  }
}

export function max(characters: number): Assertion<string> {
  return (input, issueContext) => {
    if (input.length > characters) {
      issueContext.issue({
        message: 'Max Length is ' + characters,
        value: characters,
      })
    }

    return input
  }
}

export function length(characters: number): Assertion<string> {
  return (input, issueContext) => {
    if (input.length !== characters) {
      issueContext.issue({
        message: 'Expected Length is ' + characters,
        value: input,
      })
    }

    return input
  }
}
