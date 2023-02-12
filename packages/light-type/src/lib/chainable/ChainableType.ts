import { LightType } from '../types/LightType'

export class ChainableType<TInput, TOutput = TInput>
  implements LightType<TInput, TOutput>
{
  readonly _input!: TInput
  readonly _output!: TOutput

  constructor(protected readonly t: LightType<TInput, TOutput>) {}

  parse = (input: TInput): TOutput => {
    return this.t.parse(input)
  }

  seal = (): LightType<TInput, TOutput> => {
    return this
  }

  //
  // Null / Undefined Typing
  //

  // TODO: maybe omit each key after applying it?
  optional = (): ChainableType<TInput | undefined, TOutput | undefined> => {
    const t = this.t

    return new ChainableType<TInput | undefined, TOutput | undefined>({
      parse(input) {
        if (input === undefined) {
          return undefined
        }
        return t.parse(input)
      },
    })
  }

  nullable = (): ChainableType<TInput | null, TOutput | null> => {
    const t = this.t

    return new ChainableType<TInput | null, TOutput | null>({
      parse(input) {
        if (input === null) {
          return null
        }
        return t.parse(input)
      },
    })
  }

  default = (
    defaultValue: TOutput
  ): ChainableType<TInput | undefined | null, TOutput> => {
    const t = this.t

    return new ChainableType<TInput | undefined | null, TOutput>({
      parse(input) {
        if (input === undefined || input === null) {
          return defaultValue
        }
        return t.parse(input)
      },
    })
  }

  //
  // Custom Processing
  //

  after = <TNextOutput>(postprocess: (input: TOutput) => TNextOutput) => {
    const t = this.t

    return new ChainableType<TInput, TNextOutput>({
      parse(input) {
        const nextInput = t.parse(input)

        return postprocess(nextInput)
      },
    })
  }
}
