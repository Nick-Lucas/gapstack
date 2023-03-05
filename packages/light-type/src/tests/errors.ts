import { LightTypeAggregatedErrors } from '../lib/errors/LightTypeAggregatedErrors'
import { expect } from '@jest/globals'
import { fail } from 'assert'
import { Issue } from '../lib/context/Issue'

export function aggregated(...inners: Issue[]) {
  return new LightTypeAggregatedErrors(inners)
}

const SortIssues = (a: Issue, b: Issue) => a.message.localeCompare(b.message)

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
      return expect(err.issues.sort(SortIssues)).toEqual(
        expectedError.issues.sort(SortIssues)
      )

      return
    }

    throw err
  }

  fail('Did not throw')
}
