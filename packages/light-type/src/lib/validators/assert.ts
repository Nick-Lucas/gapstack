import { LightTypeContext, Issue } from '../errors/IssueContext'

export type Assertion<T> = (input: T, ctx: LightTypeContext) => T

export function assert<T>(
  condition: (input: T) => boolean,
  issue: Pick<Issue, 'message' | 'type'>
): Assertion<T> {
  return (input, ctx) => {
    if (condition(input) === false) {
      ctx.issue({
        ...issue,
        value: input,
      })
    }

    return input
  }
}
