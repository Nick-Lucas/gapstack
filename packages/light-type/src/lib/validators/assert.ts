import { LightTypeContext } from '../context/LightTypeContext'
import { Issue } from '../context/Issue'

export type Assertion<T> = (input: T, ctx: LightTypeContext) => T

type AssertIssue = Pick<Issue, 'message' | 'type'>
type IssueMessage = Pick<Issue, 'message'>

export function assert<T>(
  condition: (input: T) => boolean,
  issue: string | AssertIssue
): Assertion<T> {
  return (input, ctx) => {
    if (condition(input) === false) {
      const _issue: Partial<AssertIssue> & IssueMessage =
        typeof issue === 'string' ? { message: issue } : issue

      ctx.addIssue({
        type: 'assertion',
        ..._issue,
        value: input,
      })
    }

    return input
  }
}
