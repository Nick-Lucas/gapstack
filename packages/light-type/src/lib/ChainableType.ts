import { LightType } from './base-types'

export class ChainableType<TOutput, TInput = TOutput>
  implements LightType<TOutput, TInput>
{
  constructor(private readonly t: LightType<TOutput, TInput>) {}

  parse(input: unknown): TOutput {
    return this.t.parse(input)
  }

  seal(): LightType<TOutput, TInput> {
    return this.t
  }

  // TODO: maybe omit each key after applying it?
  optional = (): ChainableType<TOutput | undefined, TInput | undefined> => {
    const t = this.t

    return new ChainableType<TOutput | undefined, TInput | undefined>({
      parse(input) {
        if (input === undefined) {
          return undefined
        }
        return t.parse(input)
      },
    })
  }

  nullable = (): ChainableType<TOutput | null, TInput | null> => {
    const t = this.t

    return new ChainableType<TOutput | null, TInput | null>({
      parse(input) {
        if (input === null) {
          return null
        }
        return t.parse(input)
      },
    })
  }

  default = (defaultValue: TOutput): ChainableType<TOutput, TInput> => {
    const t = this.t

    return new ChainableType<TOutput, TInput>({
      parse(input) {
        if (input === undefined || input === null) {
          return defaultValue
        }

        return t.parse(input)
      },
    })
  }
}
