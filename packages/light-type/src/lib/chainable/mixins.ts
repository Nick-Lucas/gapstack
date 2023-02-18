import { TypeInner } from '../types/TypeInner'

export function UndefinedOrParse<
  TInput,
  TOutput,
  T extends TypeInner<TInput, TOutput>
>(input: unknown, t: T): TOutput | undefined {
  if (input === undefined) {
    return undefined
  }
  return t.parse(input)
}

export function DefaultUndefinedOrParse<
  TInput,
  TOutput,
  T extends TypeInner<TInput, TOutput>
>(input: unknown, defaultValue: TOutput, t: T): TOutput {
  if (input === undefined) {
    return defaultValue
  }
  return t.parse(input)
}

export function NullOrParse<
  TInput,
  TOutput,
  T extends TypeInner<TInput, TOutput>
>(input: unknown, t: T): TOutput | null {
  if (input === null) {
    return null
  }
  return t.parse(input)
}

export function DefaultNullOrParse<
  TInput,
  TOutput,
  T extends TypeInner<TInput, TOutput>
>(input: unknown, defaultValue: TOutput, t: T): TOutput {
  if (input === null) {
    return defaultValue
  }
  return t.parse(input)
}
