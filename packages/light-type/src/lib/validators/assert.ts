import { Context, Issue } from '../errors/IssueContext'

export type Assertion<T> = (input: T, issueContext: Context) => T

export function assert<T>(
  condition: (input: T) => boolean,
  issue: Pick<Issue, 'message' | 'type'>
): Assertion<T> {
  return (input, issueContext) => {
    if (condition(input) === false) {
      issueContext.issue({
        ...issue,
        value: input,
      })
    }

    return input
  }
}
