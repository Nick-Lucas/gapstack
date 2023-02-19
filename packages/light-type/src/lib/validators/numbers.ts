import { Assertion } from './assert'

export function min(min: number): Assertion<number> {
  return (input, issueContext) => {
    if (input < min) {
      issueContext.issue({
        message: 'Min Value is ' + min,
        value: min,
      })
    }

    return input
  }
}

export function max(max: number): Assertion<number> {
  return (input, issueContext) => {
    if (input > max) {
      issueContext.issue({
        message: 'Max Value is ' + max,
        value: max,
      })
    }

    return input
  }
}
