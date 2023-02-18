import { LightTypeErrorAggregator } from '../errors/LightTypeAggregatedErrors'
import { LightTypeError } from '../errors/LightTypeError'
import { AnyLightType, InferInput, InferOutput } from '../types/LightType'
import { ChainableType } from './ChainableType'

export class ChainableArray<TInput, TOutput> extends ChainableType<
  TInput[],
  TOutput[]
> {
  static create<
    TLightArrayElement extends AnyLightType,
    TInput extends InferInput<TLightArrayElement> = InferInput<TLightArrayElement>,
    TOutput extends InferOutput<TLightArrayElement> = InferOutput<TLightArrayElement>
  >(_element: TLightArrayElement) {
    return new ChainableArray<TInput, TOutput>({
      parse(input) {
        if (Array.isArray(input)) {
          const errors = new LightTypeErrorAggregator()

          const items = new Array<TOutput>(input.length)
          for (let i = 0; i < input.length; i++) {
            errors.aggregate(String(i), () => {
              items[i] = _element.parse(input[i] as TInput) as TOutput
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
