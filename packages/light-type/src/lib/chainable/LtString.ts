import { Assertion, strings } from '../validators'
import { LtType } from './LtType'

export class LtString extends LtType<string, string> {
  private validator = (check: Assertion<string>) => {
    const t = this._t

    return new LtString({
      parse(input, ctx) {
        const value = t.parse(input, ctx)
        if (ctx.anyIssue()) {
          return ctx.NEVER
        }

        return check(value, ctx)
      },
    })
  }

  min = (min: number) => this.validator(strings.min(min))
  max = (max: number) => this.validator(strings.max(max))
  length = (length: number) => this.validator(strings.length(length))
  regex = (regex: RegExp) => this.validator(strings.regex(regex))
  includes = (text: string) => this.validator(strings.includes(text))
  startsWith = (text: string) => this.validator(strings.startsWith(text))
  endsWith = (text: string) => this.validator(strings.endsWith(text))
}
