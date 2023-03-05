import { AnyTupleInput } from '../types/creators'
import { InferInput, InferOutput } from '../types/LightType'
import { LtType } from './LtType'

export class LtTuple<TInput, TOutput> extends LtType<TInput, TOutput> {
  static create<T extends AnyTupleInput>(tuple: T) {
    type TInput = {
      [K in keyof T]: InferInput<T[K]>
    }
    type TOutput = {
      [K in keyof T]: InferOutput<T[K]>
    }

    return new LtTuple<TInput, TOutput>({
      parse(input, ctx) {
        if (Array.isArray(input)) {
          if (input.length !== tuple.length) {
            ctx.addIssue({
              type: 'length',
              message: `Invalid Tuple: ${input.length} elements instead of ${tuple.length}`,
              value: input,
            })
          }
          const result = new Array(tuple.length) as TOutput
          for (let i = 0; i < tuple.length; i++) {
            const innerContext = ctx.createChild(String(i))
            result[i] = LtType._parseInternal(tuple[i], input[i], innerContext)
          }

          return result
        }

        ctx.addIssue({
          type: 'required',
          message: `Not a Tuple`,
          value: input,
        })

        return ctx.NEVER
      },
    })
  }
}
