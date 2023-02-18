import { TypeInner } from '../types/TypeInner'
import { createPipeFunction } from '../types/pipes'
import {
  DefaultNullOrParse,
  DefaultUndefinedOrParse,
  NullOrParse,
  UndefinedOrParse,
} from './mixins'
import { ChainableBase } from './ChainableBase'

export class ChainableType<TInput, TOutput = TInput> extends ChainableBase<
  TInput,
  TOutput
> {
  constructor(t: TypeInner<TInput, TOutput>) {
    super(t)
  }

  private as = <TNextInput, TNextOutput>(
    wrap: (input: TNextInput, t: TypeInner<TInput, TOutput>) => TNextOutput
  ) => {
    const t = this.t

    return new ChainableType({
      parse: (input) => wrap(input as TNextInput, t),
    })
  }

  //
  // Null / Undefined Typing
  //

  optional = () => {
    const t = this.t

    return new ChainableType<TInput | undefined, TOutput | undefined>({
      parse(input) {
        return UndefinedOrParse(input, t)
      },
    })
  }

  nullable = () => {
    const t = this.t

    return new ChainableType<TInput | null, TOutput | null>({
      parse(input) {
        return NullOrParse(input, t)
      },
    })
  }

  default = (defaultValue: TOutput) => {
    const t = this.t

    return new ChainableType<TInput | undefined, TOutput>({
      parse(input) {
        return DefaultUndefinedOrParse(input, defaultValue, t)
      },
    })
  }

  defaultNull = (defaultValue: TOutput) => {
    const t = this.t

    return new ChainableType<TInput | null, TOutput>({
      parse(input) {
        return DefaultNullOrParse(input, defaultValue, t)
      },
    })
  }

  pipe = createPipeFunction(this.t)
}
