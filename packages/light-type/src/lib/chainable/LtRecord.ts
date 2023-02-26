import { InferInput, InferOutput } from '../types/LightType'
import { AnyKey } from '../types/utils'
import { LtType } from './LtType'

export class LtRecord<TInput, TOutput> extends LtType<TInput, TOutput> {
  static create<TKey extends LtType<AnyKey>, TValue extends LtType<unknown>>(
    key: TKey,
    value: TValue
  ) {
    type KeyInput = InferInput<TKey>
    type KeyOutput = InferOutput<TKey>
    type ValueInput = InferInput<TValue>
    type ValueOutput = InferOutput<TValue>

    type TInput = Record<KeyInput, ValueInput>
    type TOutput = Record<KeyOutput, ValueOutput>

    return new LtRecord<TInput, TOutput>({
      parse(input, ctx) {
        if (typeof input === 'object' && input !== null) {
          const maybeTInput = input as TInput

          const inputKeys = Object.keys(maybeTInput) as KeyInput[]

          const result = {} as TOutput
          for (let i = 0; i < inputKeys.length; i++) {
            const innerCtx = ctx.createChild(String(inputKeys[i]))

            const outputKey = LtType._parseInternal(
              key,
              inputKeys[i],
              innerCtx
            ) as KeyOutput

            result[outputKey] = LtType._parseInternal(
              value,
              maybeTInput[inputKeys[i]],
              innerCtx
            ) as ValueOutput
          }

          return result
        }

        ctx.addIssue({
          type: 'required',
          message: 'Not a Record',
          value: input,
        })

        return ctx.NEVER
      },
    })
  }
}
