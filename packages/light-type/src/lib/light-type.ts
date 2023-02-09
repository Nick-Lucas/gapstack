import { LightType, LightObject } from './light-types'
import { Simplify, Primitive, LiteralBase } from './util-types'

class Modifiable<TOutput, TInput = TOutput>
  implements LightType<TOutput, TInput>
{
  constructor(private readonly t: LightType<TOutput, TInput>) {}

  parse(input: TInput): TOutput {
    return this.t.parse(input)
  }

  seal(): LightType<TOutput, TInput> {
    return this.t
  }

  // TODO: maybe omit each key after applying it?
  optional = (): Modifiable<TOutput | undefined, TInput | undefined> => {
    const t = this.t

    return new Modifiable<TOutput | undefined, TInput | undefined>({
      parse(input) {
        if (input === undefined) {
          return undefined
        }
        return t.parse(input)
      },
    })
  }

  nullable = (): Modifiable<TOutput | null, TInput | null> => {
    const t = this.t

    return new Modifiable<TOutput | null, TInput | null>({
      parse(input) {
        if (input === null) {
          return null
        }
        return t.parse(input)
      },
    })
  }

  default = (defaultValue: TOutput): Modifiable<TOutput, TInput> => {
    const t = this.t

    return new Modifiable<TOutput, TInput>({
      parse(input) {
        if (input === undefined || input === null) {
          return defaultValue
        }

        return t.parse(input)
      },
    })
  }
}

type LightObjectOutput<TDef extends LightObject> = {
  [key in keyof TDef]: TDef[key] extends LightType<infer TO, unknown>
    ? TO
    : never
}

type LightObjectInput<TDef extends LightObject> = {
  [key in keyof TDef]: TDef[key] extends LightType<unknown, infer TI>
    ? TI
    : never
}

// TODO: add .implements method to enforce recreation of deep TS type

// TODO: extend all types with validations
export const lt = {
  object<TDef extends LightObject>(def: TDef) {
    const keys = Object.keys(def) as (keyof TDef)[]

    type TOutput = Simplify<LightObjectOutput<TDef>>
    type TInput = Simplify<LightObjectInput<TDef>>

    // TODO: extend Modifiable with extra methods (extend, omit, pick, etc)
    return new Modifiable<TOutput, TInput>({
      parse(input) {
        return keys.reduce((aggr, key) => {
          const parser = def[key]

          // TODO: catch and aggregate errors?
          // TODO: fix any type
          aggr[key] = parser.parse(input[key]) as any

          return aggr
        }, {} as TOutput)
      },
    })
  },
  array<TOutput, TInput>(valueType: LightType<TOutput, TInput>) {
    // TODO: extend Modifiable with extra methods
    return new Modifiable<TOutput[], TInput[]>({
      parse(input) {
        return input.map((element) => valueType.parse(element))
      },
    })
  },
  number() {
    return new Modifiable<number, number>({
      parse(input) {
        if (typeof input === 'number') {
          return input
        }

        throw new Error(`Not a Number`)
      },
    })
  },
  string() {
    return new Modifiable<string, string>({
      parse(input) {
        if (typeof input === 'string') {
          return input
        }

        throw new Error(`Not a String`)
      },
    })
  },
  date() {
    return new Modifiable<Date, Date>({
      parse(input) {
        if (input instanceof Date) {
          return input
        }

        throw new Error(`Not a Date`)
      },
    })
  },
  literal<TLiteral extends Primitive>(literal: readonly TLiteral[]) {
    const values = new Set(literal)

    return new Modifiable<TLiteral, LiteralBase<TLiteral>>({
      parse(input: unknown) {
        if (values.has(input as TLiteral)) {
          return input as TLiteral
        }

        throw new Error(`Does not match literal`)
      },
    })
  },
}

type InferInput<TLightType extends LightType<unknown>> =
  TLightType extends LightType<unknown, infer T>
    ? T extends LightType<unknown>
      ? InferInput<T>
      : T
    : never

type InferOutput<TLightType extends LightType<unknown>> =
  TLightType extends LightType<infer T, unknown>
    ? T extends LightType<unknown>
      ? InferOutput<T>
      : T
    : never

//
// Usage

const fooBarLiteral = ['foo', 'bar'] as const
const fooBarLiteral2 = [0, 'bar'] as const

const tObj = lt.object({
  deepOptionalNum: lt.number().nullable(),
  deepDate: lt.date(),
  deepString: lt.string(),
  deepLiteral: lt.literal(fooBarLiteral2),
})
const t = lt.object({
  someNum: lt.number(),
  someOptionalNum: lt.number().optional(),
  someDate: lt.date(),
  someString: lt.string(),
  someLiteral: lt.literal(fooBarLiteral),
  obj: tObj,
  arr: lt.array(tObj),
})

const sealedT = t.seal()
type ti = InferInput<typeof t>
type to = InferOutput<typeof t>
type si = InferInput<typeof sealedT>
type so = InferOutput<typeof sealedT>
