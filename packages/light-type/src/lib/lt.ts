import { ChainableType } from './chainable/ChainableType'
import { LightType } from './types/LightType'
import { LightObject } from './types/LightObject'
import { Primitive, LiteralBase } from './types/utils'
import { ChainableObject } from './chainable/ChainableObject'
import { LightTypeError } from './errors/LightTypeError'
import { ChainableArray } from './chainable/ChainableArray'

// TODO: add .implements method to enforce recreation of deep TS type

// TODO: extend all types with validations
export const lt = {
  object<TKey extends string, TLightObject extends LightObject<TKey>>(
    lightObject: TLightObject
  ) {
    return new ChainableObject<TKey, TLightObject>(lightObject)
  },
  array<TInput, TOutput>(valueType: LightType<TInput, TOutput>) {
    return new ChainableArray<TInput, TOutput>(valueType)
  },
  boolean() {
    return new ChainableType<boolean, boolean>({
      parse(input) {
        if (typeof input === 'boolean') {
          return input
        }

        throw new LightTypeError({
          message: `Not a Boolean`,
          value: input,
        })
      },
    })
  },
  number() {
    return new ChainableType<number, number>({
      parse(input) {
        if (typeof input === 'number') {
          return input
        }

        throw new LightTypeError({
          message: `Not a Number`,
          value: input,
        })
      },
    })
  },
  string() {
    return new ChainableType<string, string>({
      parse(input) {
        if (typeof input === 'string') {
          return input
        }

        throw new LightTypeError({
          message: `Not a String`,
          value: input,
        })
      },
    })
  },
  date() {
    return new ChainableType<Date, Date>({
      parse(input) {
        if (input instanceof Date) {
          return input
        }

        throw new LightTypeError({
          message: `Not a Date`,
          value: input,
        })
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

        throw new LightTypeError({
          message: `Does not match literal, expected one of ${Array.from(
            values
          ).join(', ')}`,
          value: input,
        })
      },
    })
  },
}
