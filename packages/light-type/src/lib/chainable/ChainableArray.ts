import { LightTypeAggregatedErrors } from '../errors/LightTypeAggregatedErrors'
import { LightTypeError } from '../errors/LightTypeError'
import { LightType } from '../types/LightType'
import { ChainableType } from './ChainableType'

export class ChainableArray<TInput, TOutput = TInput> extends ChainableType<
  TInput[],
  TOutput[]
> {
  constructor(valueType: LightType<TInput, TOutput>) {
    super({
      parse(input) {
        if (Array.isArray(input)) {
          const errors = new LightTypeAggregatedErrors()

          const items = new Array(input.length)
          for (let i = 0; i < input.length; i++) {
            errors.aggregate(String(i), () => {
              items[i] = valueType.parse(input[i])
            })
          }

          errors.propagate()

          return items
        }

        throw new LightTypeError({
          message: `Not an Array`,
          value: input,
        })
      },
    })
  }
}
