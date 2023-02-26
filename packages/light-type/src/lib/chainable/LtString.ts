import { Assertion, strings } from '../validators'
import { LtType } from './LtType'

export class LtString extends LtType<string, string> {
  static create() {
    return new LtString({
      parse(input, ctx) {
        if (typeof input === 'string') {
          return input
        }

        ctx.addIssue({
          type: 'required',
          message: `Not a String`,
          value: input,
        })

        return ctx.NEVER
      },
    })
  }

  private validator = (check: Assertion<string>) => {
    const target = this

    return LtString.createType({
      parse(input, ctx) {
        const value = LtType._parseInternal(target, input, ctx)
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
