import { LightTypeError } from '../errors/LightTypeError'
import { Assertion } from './assert'

export function min(characters: number): Assertion<string> {
  return (input) => {
    if (input.length < characters) {
      throw new LightTypeError({
        message: 'Min Length is ' + characters,
        value: characters,
      })
    }

    return input
  }
}

export function max(characters: number): Assertion<string> {
  return (input) => {
    if (input.length > characters) {
      throw new LightTypeError({
        message: 'Max Length is ' + characters,
        value: characters,
      })
    }

    return input
  }
}

export function length(characters: number): Assertion<string> {
  return (input) => {
    if (input.length !== characters) {
      throw new LightTypeError({
        message: 'Expected Length is ' + characters,
        value: input,
      })
    }

    return input
  }
}
