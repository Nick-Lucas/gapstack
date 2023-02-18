import { LightType } from '../types/LightType'
import { TypeInner } from '../types/TypeInner'
import { createPipeFunction } from '../types/pipes'

export class ChainableType<TInput, TOutput = TInput>
  implements LightType<TInput, TOutput>
{
  readonly _input!: TInput
  readonly _output!: TOutput

  constructor(protected readonly t: TypeInner<TInput, TOutput>) {
    this.satisfiesInput = this.satisfiesInput.bind(this)
  }

  /**
   * Check an unknown input for validatity.
   *
   * Throws if there is any validation error
   */
  parse = (input: unknown): TOutput => {
    return this.t.parse(input)
  }

  /**
   * Check a strictly typed input for validatity.
   *
   * Throws if there is any validation error
   */
  check = (input: TInput): TOutput => {
    return this.t.parse(input)
  }

  /**
   * Seals to type to prevent changes, and simplifies the type definition
   */
  seal = (): LightType<TInput, TOutput> => {
    return this
  }

  //
  // Null / Undefined Typing
  //

  /**
   * Allow undefined. For types on objects this will also make the key optional.
   *
   * ```ts
   * const optionalNumber = lt.number().optional()
   * // `number | undefined`
   *
   * const obj = lt.object({
   *   value: optionalNumber
   * })
   * // `{ value?: number | undefined }`
   * ```
   */
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

  /**
   * Allow null
   *
   * ```ts
   * const nullableNumber = lt.number().nullable()
   * // `number | null`
   * ```
   */
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

  /**
   * Allow undefined, and set a default value if undefined is seen.
   * For types on objects this will also make the key optional.
   *
   * ```ts
   * const optionalNumber = lt.number().default(0)
   * // Input:  `number | undefined`
   * // Output: `number`
   *
   * const obj = lt.object({
   *   value: optionalNumber
   * })
   * // Input:  `{ value?: number | undefined }`
   * // Output: `{ value: number }`
   * ```
   */
  default = (
    defaultValue: TOutput
  ): ChainableType<TInput | undefined, TOutput> => {
    const t = this.t

    return new ChainableType<TInput | undefined, TOutput>({
      parse(input) {
        if (input === undefined) {
          return defaultValue
        }
        return t.parse(input)
      },
    })
  }

  /**
   * Allow null, and set a defaullt value if null is seen
   *
   * ```ts
   * const nullableNumber = lt.number().defaultNull(0)
   * // Input:  `number | null`
   * // Output: `number`
   * ```
   */
  defaultNull = (
    defaultValue: TOutput
  ): ChainableType<TInput | null, TOutput> => {
    const t = this.t

    return new ChainableType<TInput | null, TOutput>({
      parse(input) {
        if (input === null) {
          return defaultValue
        }
        return t.parse(input)
      },
    })
  }

  pipe = createPipeFunction(this.t)

  /**
   * **Only generates compile-time errors**
   *
   * Ensure that the input of this Light Type is statically compatible with a given type.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  satisfiesInput<TKnownInput extends TInput>(): this
  satisfiesInput<TKnownInput extends TInput>(value: TKnownInput): this
  satisfiesInput() {
    return this
  }
}
