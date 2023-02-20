import { LightTypeAggregatedErrors } from '../lib/errors/LightTypeAggregatedErrors'
import { expect } from '@jest/globals'
import { fail } from 'assert'
import { Issue } from '../lib/context/Issue'

export function aggregated(...inners: Issue[]) {
  return new LightTypeAggregatedErrors(inners)
}

export function throws(
  callback: () => void,
  expectedError: LightTypeAggregatedErrors
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

    throw err
  }

  fail('Did not throw')
}

const aggToObj = (err: LightTypeAggregatedErrors) => {
  return {
    message: err.message,
    errors: err.issues.sort((a, b) => {
      if (a.path && b.path) {
        return a.path?.localeCompare(b.path)
      }
      return a.message.localeCompare(b.message)
    }),
  }
}
