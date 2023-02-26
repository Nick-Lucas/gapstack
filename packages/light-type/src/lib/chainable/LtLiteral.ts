import { LiteralBase, Primitive } from '../types/utils'
import { LtType } from './LtType'

export class LtLiteral<TInput, TOutput> extends LtType<TInput, TOutput> {
  static create<TLiteral extends Primitive>(
    literal: TLiteral | readonly TLiteral[]
  ) {
    const values = new Set(Array.isArray(literal) ? literal : [literal])
    const list = Array.from(values).join(', ')

    return new LtLiteral<LiteralBase<TLiteral>, TLiteral>({
      parse(input: unknown, ctx) {
        if (values.has(input as TLiteral)) {
          return input as TLiteral
        }

        ctx.addIssue({
          type: 'required',
          message: `Does not match literal, expected one of: ${list}`,
          value: input,
        })

        return ctx.NEVER
      },
    })
  }
}
