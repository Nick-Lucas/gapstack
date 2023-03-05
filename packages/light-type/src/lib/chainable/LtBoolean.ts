import { LtType } from './LtType'

export class LtBoolean extends LtType<boolean, boolean> {
  static create() {
    return new LtBoolean({
      parse(input, ctx) {
        if (typeof input === 'boolean') {
          return input
        }

        ctx.addIssue({
          type: 'required',
          message: `Not a Boolean`,
          value: input,
        })

        return ctx.NEVER
      },
    })
  }
}
