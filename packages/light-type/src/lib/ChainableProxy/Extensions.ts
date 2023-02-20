import { TypeInner, AnyInner } from './TypeInner'

interface NumberExtensions<TInput = number, TOutput = TInput> {
  min(min: number): AddExtensions<TypeInner<TInput, TOutput>>
  max(max: number): AddExtensions<TypeInner<TInput, TOutput>>
}

interface StringExtensions<TInput = string, TOutput = TInput> {
  min(min: number): AddExtensions<TypeInner<TInput, TOutput>>
  max(max: number): AddExtensions<TypeInner<TInput, TOutput>>
  length(length: number): AddExtensions<TypeInner<TInput, TOutput>>
  includes(includes: string): AddExtensions<TypeInner<TInput, TOutput>>
  regex(regex: RegExp): AddExtensions<TypeInner<TInput, TOutput>>
}

interface A extends NumberExtensions, StringExtensions {
  //
}

export type AllExtensionKeys =
  | Key<NumberExtensions>
  | Key<StringExtensions>
  | Key<CommonExtensions>

export type Key<T> = Extract<keyof T, string>

interface Functor<A, B> {
  (input: A): B
}

export type CommonExtensions<TInput = unknown, TOutput = TInput> = {
  readonly _input: TInput
  readonly _output: TOutput
  //
  parse(input: unknown): TOutput
  check(input: TInput): TOutput
  //
  pipe<TNextOutput>(
    functor: Functor<TOutput, TNextOutput>
  ): AddExtensions<TypeInner<TInput, TNextOutput>>
  //
  optional(): AddExtensions<TypeInner<TInput | undefined, TOutput | undefined>>
  default(value: TOutput): AddExtensions<TypeInner<TInput | undefined, TOutput>>
  nullable(): AddExtensions<TypeInner<TInput | null, TOutput | null>>
  defaultNull(value: TOutput): AddExtensions<TypeInner<TInput | null, TOutput>>
}

type ChainExtensions<T extends AnyInner, TOutput> = TOutput extends number
  ? NumberExtensions<T>
  : TOutput extends string
  ? StringExtensions<T>
  : TOutput

export type AddExtensions<T extends AnyInner> = T extends TypeInner<
  infer TInput,
  infer TOutput
>
  ? CommonExtensions<TInput, TOutput> & ChainExtensions<T, TOutput>
  : never

export type InferInput<Inner extends AnyInner> = Inner['_input']
export type InferOutput<Inner extends AnyInner> = Inner['_output']
