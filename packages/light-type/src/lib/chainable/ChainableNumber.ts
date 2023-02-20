import { Assertion, numbers } from '../validators'
import { ChainableType } from './ChainableType'

export class ChainableNumber extends ChainableType<number, number> {
  private validator = (check: Assertion<number>) => {
    const t = this.t

    return new ChainableNumber({
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
