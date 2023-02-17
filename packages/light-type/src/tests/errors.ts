import { LightTypeAggregatedErrors } from '../lib/errors/LightTypeAggregatedErrors'
import { LightTypeError } from '../lib/errors/LightTypeError'
import { expect } from '@jest/globals'
import { fail } from 'assert'

export function aggregated(...inners: LightTypeError[]) {
  return new LightTypeAggregatedErrors(inners)
}

export function throws(
  callback: () => void,
  expectedError: LightTypeAggregatedErrors | LightTypeError
) {
  try {
    callback()
  } catch (err) {
    if (
      err instanceof LightTypeAggregatedErrors &&
      expectedError instanceof LightTypeAggregatedErrors
    ) {
      const actual = aggToObj(err)
      const expected = aggToObj(expectedError)
      expect(actual).toEqual(expected)

      return
    }

    if (
      err instanceof LightTypeError &&
      expectedError instanceof LightTypeError
    ) {
      const actual = toObj(err)
      const expected = toObj(expectedError)
      expect(actual).toEqual(expected)

      return
    }

    throw err
  }

  fail('Did not throw')
}

const aggToObj = (err: LightTypeAggregatedErrors) => {
  return {
    message: err.message,
    errors: err.errors.map(toObj).sort((a, b) => {
      if (a.path && b.path) {
        return a.path?.localeCompare(b.path)
      }
      return a.message.localeCompare(b.message)
    }),
  }
}

const toObj = (err: LightTypeError) => {
  return {
    message: err.message,
    value: err.value,
    path: err.path,
  }
}
