import { Context } from '../context'
import { AnyUnionInput } from '../types/creators'
import { InferInput, InferOutput } from '../types/LightType'
import { LtType } from './LtType'

export class LtUnion<TInput, TOutput> extends LtType<TInput, TOutput> {
  static create<T extends AnyUnionInput>(types: T) {
    type TInput = {
      [key in keyof T]: InferInput<T[key]>
    }[number]

    type TOutput = {
      [key in keyof T]: InferOutput<T[key]>
    }[number]

    return new LtUnion<TInput, TOutput>({
      parse(input, ctx) {
        for (const type of types) {
          const specialContext = new Context()

          const result = LtType._parseInternal(
            type,
            input,
            specialContext
          ) as TOutput
          if (specialContext.anyIssue()) {
            // We go until we get one without any validation errors
            continue
          }

          return result
        }

        // TODO: maybe can give more details on why no type was matched?
        ctx.addIssue({
          type: 'required',
          message: 'No Matching Type in Union',
          value: input,
        })

        return ctx.NEVER
      },
    })
  }
}
