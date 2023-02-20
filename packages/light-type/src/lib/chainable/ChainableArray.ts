import { AnyLightType, InferInput, InferOutput } from '../types/LightType'
import { arrays, Assertion } from '../validators'
import { ChainableType } from './ChainableType'

export class ChainableArray<TInput, TOutput> extends ChainableType<
  TInput[],
  TOutput[]
> {
  static create<
    TElement extends AnyLightType,
    TInput extends InferInput<TElement> = InferInput<TElement>,
    TOutput extends InferOutput<TElement> = InferOutput<TElement>
  >(elementType: TElement) {
    return new ChainableArray<TInput, TOutput>({
      parse(input, ctx) {
        if (Array.isArray(input)) {
          const items = new Array<TOutput>(input.length)
          for (let i = 0; i < input.length; i++) {
            items[i] = elementType._t.parse(
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

  //
  // Validators
  //

  private validator = (check: Assertion<TOutput[]>) => {
    const t = this._t

    return new ChainableArray<TInput, TOutput>({
      parse(input, ctx) {
        const value = t.parse(input, ctx)
        if (ctx.anyIssue()) {
          return ctx.NEVER
        }

        return check(value, ctx)
      },
    })
  }

  min = (min: number) => this.validator(arrays.min<TOutput>(min))
  max = (max: number) => this.validator(arrays.max<TOutput>(max))
  length = (length: number) => this.validator(arrays.length<TOutput>(length))
}
