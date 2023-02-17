import { LightTypeAggregatedErrors } from '../errors/LightTypeAggregatedErrors'
import { LightTypeError } from '../errors/LightTypeError'
import { AnyLightArrayElement } from '../types/LightObject'
import { InferInput, InferOutput } from '../types/LightType'
import { ChainableType } from './ChainableType'

export class ChainableArray<
  TLightArray extends AnyLightArrayElement,
  TInput extends InferInput<TLightArray> = InferInput<TLightArray>,
  TOutput extends InferOutput<TLightArray> = InferOutput<TLightArray>
> extends ChainableType<TInput[], TOutput[]> {
  readonly _element!: TLightArray

  constructor(protected readonly elementType: TLightArray) {
    super({
      parse(input) {
        if (Array.isArray(input)) {
          const errors = new LightTypeAggregatedErrors()

          const items = new Array(input.length)
          for (let i = 0; i < input.length; i++) {
            errors.aggregate(String(i), () => {
              items[i] = elementType.parse(input[i])
            })
          }

          errors.throwIfAny()

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
