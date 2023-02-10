import { ChainableType } from './ChainableType'
import {
  LightType,
  LightObject,
  InferLightObjectInput,
  InferLightObjectOutput,
} from './base-types'
import { Simplify, Primitive, LiteralBase } from './util-types'
import { ChainableObject } from './ChainableObject'

// TODO: add .implements method to enforce recreation of deep TS type

// TODO: extend all types with validations
export const lt = {
  object<TKey extends string, TLightObject extends LightObject<TKey>>(
    lightObject: TLightObject
  ) {
    const keys = Object.keys(lightObject) as TKey[]

    type TOutput = Simplify<InferLightObjectOutput<TLightObject>>
    type TInput = Simplify<InferLightObjectInput<TLightObject>>

    // TODO: extend Modifiable with extra methods (extend, omit, pick, etc)
    return new ChainableObject<TInput, TOutput>({
      parse(input) {
        if (typeof input === 'object' && input !== null) {
          const obj = input as TInput

          return keys.reduce((aggr, key) => {
            const parser = lightObject[key]

            // TODO: catch and aggregate errors?
            // TODO: fix any type
            aggr[key] = parser.parse(obj[key]) as any

            return aggr
          }, {} as TOutput)
        }

        throw new Error(`Not an Object, received "${input}"`)
      },
    })
  },
  array<TInput, TOutput>(valueType: LightType<TInput, TOutput>) {
    // TODO: extend Modifiable with extra methods
    return new ChainableType<TInput[], TOutput[]>({
      parse(input) {
        if (Array.isArray(input)) {
          return input.map((element) => valueType.parse(element))
        }

        throw new Error(`Not an Array, received "${input}"`)
      },
    })
  },
  boolean() {
    return new ChainableType<boolean, boolean>({
      parse(input) {
        if (typeof input === 'boolean') {
          return input
        }

        throw new Error(
          `Not a Boolean, received "${input}", received "${input}"`
        )
      },
    })
  },
  number() {
    return new ChainableType<number, number>({
      parse(input) {
        if (typeof input === 'number') {
          return input
        }

        throw new Error(`Not a Number, received "${input}"`)
      },
    })
  },
  string() {
    return new ChainableType<string, string>({
      parse(input) {
        if (typeof input === 'string') {
          return input
        }

        throw new Error(`Not a String, received "${input}"`)
      },
    })
  },
  date() {
    return new ChainableType<Date, Date>({
      parse(input) {
        if (input instanceof Date) {
          return input
        }

        throw new Error(`Not a Date, received "${input}"`)
      },
    })
  },
  literal<TLiteral extends Primitive>(literal: readonly TLiteral[]) {
    const values = new Set(literal)

    return new ChainableType<LiteralBase<TLiteral>, TLiteral>({
      parse(input: unknown) {
        if (values.has(input as TLiteral)) {
          return input as TLiteral
        }

        throw new Error(
          `Does not match literal, received "${input}" but expected one of ${Array.from(
            values
          ).join(', ')}`
        )
      },
    })
  },
}
