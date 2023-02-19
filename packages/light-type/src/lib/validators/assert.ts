import { LightTypeContext } from '../context/LightTypeContext'
import { Issue } from '../context/Issue'

export type Assertion<T> = (input: T, ctx: LightTypeContext) => T

export function assert<T>(
  condition: (input: T) => boolean,
  issue: Pick<Issue, 'message' | 'type'>
): Assertion<T> {
  return (input, ctx) => {
    if (condition(input) === false) {
      ctx.addIssue({
        ...issue,
        value: input,
      })
    }

    return input
  }
}
