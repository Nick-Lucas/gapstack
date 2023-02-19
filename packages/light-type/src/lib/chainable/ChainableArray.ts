import { AnyLightType, InferInput, InferOutput } from '../types/LightType'
import { ChainableType } from './ChainableType'

export class ChainableArray<
  TElement extends AnyLightType,
  TInput extends InferInput<TElement> = InferInput<TElement>,
  TOutput extends InferOutput<TElement> = InferOutput<TElement>
> extends ChainableType<TInput[], TOutput[]> {
  readonly _element!: TElement

  constructor(protected readonly elementType: TElement) {
    super({
      parse(input, ctx) {
        if (Array.isArray(input)) {
          const items = new Array<TOutput>(input.length)
          for (let i = 0; i < input.length; i++) {
            items[i] = elementType.t.parse(
              input[i],
              ctx.createChild(String(i))
            ) as TOutput
          }

          return items
        }

        ctx.issue({
          type: 'invalid_type',
          message: `Not an Array`,
          value: input,
        })

        return input as TOutput[]
      },
    })
  }
}
