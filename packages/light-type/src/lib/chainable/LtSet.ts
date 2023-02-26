import { LtType } from './LtType'

export class LtSet<TInput, TOutput> extends LtType<TInput, TOutput> {
  static create<TInput, TOutput>(valueType: LtType<TInput, TOutput>) {
    return LtType.createType<TInput[] | Set<TInput>, Set<TOutput>>({
      parse(_input, ctx) {
        let input = [] as TInput[]
        if (_input instanceof Set) {
          input = Array.from(_input)
        } else {
          input = _input as TInput[]
        }

        if (Array.isArray(input)) {
          const result = new Set<TOutput>()

          for (let i = 0; i < input.length; i++) {
            const innerContext = ctx.createChild(String(i))
            result.add(LtType._parseInternal(valueType, input[i], innerContext))
          }

          return result
        }

        ctx.addIssue({
          type: 'required',
          message: `Not a Set or Arraylike`,
          value: input,
        })

        return ctx.NEVER
      },
    })
  }
}
