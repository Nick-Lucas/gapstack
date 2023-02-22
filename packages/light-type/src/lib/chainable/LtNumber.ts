import { Assertion, numbers } from '../validators'
import { LtType } from './LtType'

export class LtNumber extends LtType<number, number> {
  private validator = (check: Assertion<number>) => {
    const t = this._t

    return new LtNumber({
      parse(input, ctx) {
        const value = t.parse(input, ctx)
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
