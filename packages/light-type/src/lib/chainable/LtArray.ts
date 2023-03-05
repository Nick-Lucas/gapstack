import { InferInput, InferOutput, LightType } from '../types/LightType'
import { TypeInner } from '../types/TypeInner'
import { arrays, Assertion } from '../validators'
import { LtType } from './LtType'

export class LtArray<TInput, TOutput> extends LtType<TInput[], TOutput[]> {
  constructor(
    readonly element: LightType<TInput, TOutput>,
    inner: TypeInner<TInput[], TOutput[]>
  ) {
    super(inner)
  }

  static create<
    TElement extends LtType,
    TInput extends InferInput<TElement> = InferInput<TElement>,
    TOutput extends InferOutput<TElement> = InferOutput<TElement>
  >(elementType: TElement) {
    return new LtArray<TInput, TOutput>(
      elementType as LightType<TInput, TOutput>,
      {
        parse(input, ctx) {
          if (Array.isArray(input)) {
            const items = new Array<TOutput>(input.length)
            for (let i = 0; i < input.length; i++) {
              items[i] = LtType._parseInternal(
                elementType,
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
      }
    )
  }

  //
  // Validators
  //

  private validator = (check: Assertion<TOutput[]>) => {
    const target = this

    return new LtArray<TInput, TOutput>(this.element, {
      parse(input, ctx) {
        const value = LtType._parseInternal(target, input, ctx)
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

  asSet = () => {
    const target = this

    return LtType.createType<TInput[], Set<TOutput>>({
      parse(input, context) {
        const result = LtType._parseInternal(target, input, context)
        if (context.anyIssue()) {
          return context.NEVER
        }

        return new Set(result)
      },
    })
  }
}
