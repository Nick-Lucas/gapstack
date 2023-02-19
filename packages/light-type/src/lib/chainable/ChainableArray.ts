import { AnyLightType, InferInput, InferOutput } from '../types/LightType'
import { ChainableType } from './ChainableType'
import { arrays } from '../validators'

export class ChainableArray<
  TElement extends AnyLightType,
  TInput extends InferInput<TElement> = InferInput<TElement>,
  TOutput extends InferOutput<TElement> = InferOutput<TElement>
> extends ChainableType<TInput[], TOutput[]> {
  readonly _element!: TElement

  constructor(protected readonly elementType: TElement) {
    super({
      type: 'array',
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

        ctx.addIssue({
          type: 'required',
          message: `Not an Array`,
          value: input,
        })

        return ctx.NEVER
      },
    })
  }

  min = (min: number) => this.pipe(arrays.min(min))
  max = (max: number) => this.pipe(arrays.max(max))
  length = (length: number) => this.pipe(arrays.length(length))
}
