import { Assertion, numbers } from '../validators'
import { LtType } from './LtType'

export class LtNumber extends LtType<number, number> {
  static create() {
    return new LtNumber({
      parse(input, ctx) {
        if (typeof input === 'number') {
          return input
        }

        ctx.addIssue({
          type: 'required',
          message: `Not a Number`,
          value: input,
        })

        return ctx.NEVER
      },
    })
  }

  private validator = (check: Assertion<number>) => {
    const target = this

    return LtNumber.createType({
      parse(input, ctx) {
        const value = LtType._parseInternal(target, input, ctx)
        if (ctx.anyIssue()) {
          return ctx.NEVER
        }

        return check(value, ctx)
      },
    })
  }

  min = (min: number) => this.validator(numbers.min(min))
  max = (max: number) => this.validator(numbers.max(max))
}
