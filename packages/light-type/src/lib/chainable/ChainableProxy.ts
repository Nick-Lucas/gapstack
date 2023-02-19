import { DataType, TypeInner as OldTypeInner } from '../types/TypeInner'
import { Simplify } from '../types/utils'
import { Assertion, numbers, strings } from '../validators'

type TypeInner<A, B> = OldTypeInner<A, B> & {
  pipeline: unknown[]
}

type Any = TypeInner<unknown, unknown>
type ProducerOf<T> = TypeInner<unknown, T>

type NumberExtensions<T extends Any> = T & {
  min(min: number): AddExtensions<T>
  max(max: number): AddExtensions<T>
}
type StringExtensions<T extends Any> = T & {
  min(min: number): AddExtensions<T>
  max(max: number): AddExtensions<T>
  length(length: number): AddExtensions<T>
  regex(regex: RegExp): AddExtensions<T>
}

type CommonExtensions<T extends Any> = T extends TypeInner<
  infer TInput,
  infer TOutput
>
  ? {
      optional(): AddExtensions<
        TypeInner<TInput | undefined, TOutput | undefined>
      >
      default(
        value: TOutput
      ): AddExtensions<TypeInner<TInput | undefined, TOutput>>
      nullable(): AddExtensions<TypeInner<TInput | null, TOutput | null>>
      defaultNull(
        value: TOutput
      ): AddExtensions<TypeInner<TInput | null, TOutput>>
    }
  : never

type AddExtensions<T extends Any> = CommonExtensions<T> &
  (T extends ProducerOf<number>
    ? NumberExtensions<T>
    : T extends ProducerOf<string>
    ? StringExtensions<T>
    : T)

function Next<T extends TypeInner<any, any>>(t: T) {
  return new Proxy(t as AddExtensions<T>, {
    get(target, p, receiver) {
      if (target.type === 'number') {
        const t = target as ProducerOf<number>

        switch (p) {
          case 'min': {
            return function (min: number) {
              t.pipeline.push(numbers.min(min))
              return receiver
            }
          }
          case 'max': {
            return function (min: number) {
              t.pipeline.push(numbers.min(min))
              return receiver
            }
          }
        }
      }

      return Reflect.get(target, p, receiver)
    },
  })
}

function number() {
  return Next<TypeInner<number, number>>({
    type: 'number',
    parse(input: number, context) {
      return input as number
    },
    pipeline: [],
  })
}

function string() {
  return Next<TypeInner<string, string>>({
    type: 'number',
    parse(input: string, context) {
      return input as string
    },
    pipeline: [],
  })
}
