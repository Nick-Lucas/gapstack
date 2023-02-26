import { LightType } from '../types/LightType'
import { TypeInner } from '../types/TypeInner'
import { createPipeFunction } from '../types/pipes'
import { Context, InternalContext } from '../context/Context'

interface LtTypeOptions {
  optionalMode?: 'none' | 'optional' | 'default'
  defaultValue?: unknown
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class LtType<TInput = any, TOutput = TInput>
  implements LightType<TInput, TOutput>
{
  readonly _input!: TInput
  readonly _output!: TOutput

  // TODO: change _t to internal, stop using LightType notations inside the codebase
  constructor(
    /** @internal this API may change without notice */ readonly _t: TypeInner<
      TInput,
      TOutput
    >,
    readonly options: LtTypeOptions = {}
  ) {
    this.satisfiesInput = this.satisfiesInput.bind(this)
  }

  static createType<TInput, TOutput = TInput>(
    /** @internal this API may change without notice */ _t: TypeInner<
      TInput,
      TOutput
    >,
    _options?: LtTypeOptions
  ) {
    const options = _options ?? {}
    options.optionalMode ??= 'none'

    return new LtType<TInput, TOutput>(_t, options)
  }

  /** @internal please use `.parse` instead. May change without warning. */
  static _parseInternal = <TInput, TOutput>(
    ltType: LtType<TInput, TOutput>,
    input: unknown,
    ctx: InternalContext
  ): TOutput => {
    if (ltType.options.optionalMode === 'optional' && input === undefined) {
      return undefined as TOutput
    }

    if (ltType.options.optionalMode === 'default' && input === undefined) {
      return ltType.options.defaultValue as TOutput
    }

    return ltType._t.parse(input, ctx)
  }

  /**
   * Check an unknown input for validity.
   *
   * Throws if there is any validation error
   */
  parse = (input: unknown): TOutput => {
    const ctx = new Context()

    const result = LtType._parseInternal(this, input, ctx)

    ctx.throwIfAny()

    return result
  }

  /**
   * Check a strictly typed input for validatity.
   *
   * Throws if there is any validation error
   */
  check = (input: TInput): TOutput => {
    return this.parse(input)
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
  optional = (): LtType<TInput | undefined, TOutput | undefined> => {
    return new LtType<TInput | undefined, TOutput | undefined>(this._t, {
      ...this.options,
      optionalMode: 'optional',
    })
  }

  /**
   * Disallow undefined. Mostly useful when a type has already been marked as `.optiona()` previously
   *
   * ```ts
   * const optionalNumber = lt.number().optional()
   * // `number | undefined`
   *
   * const requiredNumber = optionalNumber.required()
   * // `number`
   * ```
   */
  required = (): LtType<
    Exclude<TInput, undefined>,
    Exclude<TOutput, undefined>
  > => {
    return new LtType<Exclude<TInput, undefined>, Exclude<TOutput, undefined>>(
      this._t as any,
      {
        ...this.options,
        optionalMode: 'none',
      }
    )
  }

  /**
   * Allow null
   *
   * ```ts
   * const nullableNumber = lt.number().nullable()
   * // `number | null`
   * ```
   */
  nullable = (): LtType<TInput | null, TOutput | null> => {
    const t = this._t

    return new LtType<TInput | null, TOutput | null>({
      parse(input, ctx) {
        if (input === null) {
          return null
        }
        return t.parse(input, ctx)
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
  default = (defaultValue: TOutput): LtType<TInput | undefined, TOutput> => {
    return new LtType<TInput | undefined, TOutput>(this._t, {
      ...this.options,
      optionalMode: 'default',
      defaultValue: defaultValue,
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
  defaultNull = (defaultValue: TOutput): LtType<TInput | null, TOutput> => {
    const t = this._t

    return new LtType<TInput | null, TOutput>({
      parse(input, ctx) {
        if (input === null) {
          return defaultValue
        }
        return t.parse(input, ctx)
      },
    })
  }

  pipe = createPipeFunction(this)

  /**
   * **Only generates compile-time errors**
   *
   * Ensure that the given type is assignable to this type.
   * Will not detect extraneous input fields, only those that the Light Type will parse.
   *
   * ```ts
   * const MyDto = lt.object(/ etc /).satisfiesInput<KnownInputType>()
   * // or
   * const MyDto = lt.object(/ etc /).satisfiesInput(knownValue)
   * // then
   * const myDto = MyDto.parse(knownValue)
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  satisfiesInput<T extends TInput>(): this
  satisfiesInput<T extends TInput>(value: T): this
  satisfiesInput() {
    return this
  }
}
