import { InferInput, InferOutput } from '../types/LightType'
import { AnyKey } from '../types/utils'
import { LtType } from './LtType'

export class LtMap<TInput, TOutput> extends LtType<TInput, TOutput> {
  static create<TKey extends LtType<AnyKey>, TValue extends LtType<unknown>>(
    key: TKey,
    value: TValue
  ) {
    type KeyInput = InferInput<TKey>
    type KeyOutput = InferOutput<TKey>
    type ValueInput = InferInput<TValue>
    type ValueOutput = InferOutput<TValue>

    type TInput = Map<KeyInput, ValueInput> | Record<KeyInput, ValueInput>
    type TOutput = Map<KeyOutput, ValueOutput>

    return new LtMap<TInput, TOutput>({
      parse(_input, ctx) {
        const input =
          _input instanceof Map
            ? (Object.fromEntries(_input) as Record<KeyInput, ValueInput>)
            : _input

        if (typeof input === 'object' && input !== null) {
          const maybeTInput = input as TInput

          const inputKeys = Object.keys(maybeTInput) as (keyof TInput)[]

          const result = new Map() as TOutput
          for (let i = 0; i < inputKeys.length; i++) {
            const innerContext = ctx.createChild(String(inputKeys[i]))

            result.set(
              LtType._parseInternal(
                key,
                inputKeys[i],
                innerContext
              ) as KeyOutput,
              LtType._parseInternal(
                value,
                maybeTInput[inputKeys[i]],
                innerContext
              ) as ValueOutput
            )
          }

          return result
        }

        ctx.addIssue({
          type: 'required',
          message: 'Not a Map or Object',
          value: input,
        })

        return ctx.NEVER
      },
    })
  }
}
