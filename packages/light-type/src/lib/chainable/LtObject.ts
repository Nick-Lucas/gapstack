import {
  AnyLightObject,
  InferLightObjectInput,
  InferLightObjectOutput,
} from '../types/LightObject'
import { LtType } from './LtType'
import { mergeLightObjects } from '../mergeLightObjects'
import { Simplify } from '../types/utils'
import { TypeInner } from '../types/TypeInner'

type KeysParam<T> = { [TKey in keyof T]?: true }

// TODO: is simplify needed here?
type GetTInput<LO extends AnyLightObject> = Simplify<InferLightObjectInput<LO>>
type GetTOutput<LO extends AnyLightObject> = Simplify<
  InferLightObjectOutput<LO>
>
type GetTKey<A extends AnyLightObject, B, C> =
  | Extract<keyof A, string> &
      Extract<keyof B, string> &
      Extract<keyof C, string>

export interface LtObjectOptions {
  extraKeys?: 'strip' | 'strict' | 'passthrough'
}

export class LtObject<
  // TODO: can this be simplified now?
  TLightObject extends AnyLightObject,
  TInput extends GetTInput<TLightObject> = GetTInput<TLightObject>,
  TOutput extends GetTOutput<TLightObject> = GetTOutput<TLightObject>,
  TKey extends GetTKey<TLightObject, TInput, TOutput> = GetTKey<
    TLightObject,
    TInput,
    TOutput
  >
> extends LtType<TInput, TOutput> {
  constructor(
    t: TypeInner<TInput, TOutput>,
    readonly shape: TLightObject,
    readonly functors: LtObjectOptions
  ) {
    super(t)
  }

  static create<
    TLightObject extends AnyLightObject,
    TInput extends GetTInput<TLightObject> = GetTInput<TLightObject>,
    TOutput extends GetTOutput<TLightObject> = GetTOutput<TLightObject>,
    TKey extends GetTKey<TLightObject, TInput, TOutput> = GetTKey<
      TLightObject,
      TInput,
      TOutput
    >
  >(shape: TLightObject, _functors?: LtObjectOptions) {
    const keys = Object.keys(shape) as TKey[]
    const keySet = new Set<string>(keys)

    const functors = _functors ?? {}
    functors.extraKeys ??= 'strip'

    return new LtObject<TLightObject, TInput, TOutput, TKey>(
      {
        parse(input, ctx) {
          if (typeof input === 'object' && input !== null) {
            const obj = input as TInput

            //
            // Parse
            //

            const result = keys.reduce((aggr, key) => {
              const parser = shape[key]

              aggr[key] = LtType._parseInternal(
                parser,
                obj[key],
                ctx.createChild(key)
              ) as TOutput[TKey]

              return aggr
            }, {} as TOutput)

            if (ctx.anyIssue()) {
              return ctx.NEVER
            }

            //
            // Extra Keys
            //

            if (functors.extraKeys === 'strict') {
              const inputKeys = Object.keys(input)

              for (const inputKey of inputKeys) {
                if (!keySet.has(inputKey)) {
                  // Maybe: Could produce an issue per extra key?

                  ctx.addIssue({
                    type: 'strict',
                    message: `Extra keys found`,
                    value: input,
                  })

                  return ctx.NEVER
                }
              }
            }

            if (functors.extraKeys === 'passthrough') {
              const inputKeys = Object.keys(input)

              for (const inputKey of inputKeys) {
                if (!keySet.has(inputKey)) {
                  result[inputKey as keyof TOutput] =
                    input[inputKey as keyof typeof input]
                }
              }
            }

            //
            // OK
            //

            return result
          }

          ctx.addIssue({
            type: 'required',
            message: `Not an Object`,
            value: input,
          })

          return ctx.NEVER
        },
      },
      shape,
      functors
    )
  }

  /**
   * Combines the existing object with a new object, discarding any duplicate keys
   *
   * ```ts
   * const Entity = lt.object({ id: lt.number(), name: lt.string() })
   * const CarEntity = Entity.extend({ id: lt.string(), brand: lt.string() })
   *
   * // The resulting type discards the duplicate `id` key
   * // `{ id: number; name: string; brand: string }`
   * ```
   */
  extend = <TExtendLightObject extends AnyLightObject>(
    extendLightObject: TExtendLightObject
  ) => {
    const lightObject = this.shape

    const extendedLightObject = mergeLightObjects(
      extendLightObject,
      lightObject
    )

    return LtObject.create(extendedLightObject)
  }

  /**
   * Combines the existing object with a new object, overwriting any duplicate keys
   *
   * ```ts
   * const Entity = lt.object({ id: lt.number(), name: lt.string() })
   * const CarEntity = Entity.merge({ id: lt.string(), brand: lt.string() })
   *
   * // The resulting type replaces the duplicate `id` key
   * // `{ id: string; name: string; brand: string }`
   * ```
   */
  merge = <TExtendLightObject extends AnyLightObject>(
    extendLightObject: TExtendLightObject
  ) => {
    const lightObject = this.shape

    const extendedLightObject = mergeLightObjects(
      lightObject,
      extendLightObject
    )

    return LtObject.create(extendedLightObject)
  }

  /**
   * Removes one or more keys from the object
   *
   * ```ts
   * const CarEntity = lt.object({
   *   id: lt.string(),
   *   name: lt.string(),
   *   brand: lt.string()
   * })
   *
   * const CarName = CarEntity.omit({ id: true, brand: true })
   * // `{ name: string }`
   * ```
   */
  omit = <TOmit extends KeysParam<TLightObject>>(omit: TOmit) => {
    const lightObject = this.shape

    type TOmitKeys = keyof {
      [key in keyof TOmit]: TOmit[key] extends true ? key : never
    }
    type TOmittedLightObject = Simplify<Omit<TLightObject, TOmitKeys>>

    const omittedLightObject: TOmittedLightObject = {
      ...lightObject,
    }
    for (const key in omit) {
      if (omit[key] === true) {
        // TODO: fix this keying type
        delete omittedLightObject[key as unknown as keyof TOmittedLightObject]
      }
    }

    return LtObject.create(omittedLightObject)
  }

  /**
   * Selects one or more keys from the object
   *
   * ```ts
   * const CarEntity = lt.object({
   *   id: lt.string(),
   *   name: lt.string(),
   *   brand: lt.string()
   * })
   *
   * const CarName = CarEntity.pick({ name: true })
   * // `{ name: string }`
   * ```
   */
  pick = <TPick extends KeysParam<TLightObject>>(pick: TPick) => {
    const lightObject = this.shape

    type TPickKeys = keyof {
      [key in keyof TPick]: TPick[key] extends true ? key : never
    }
    type TPickedLightObject = Simplify<
      Pick<TLightObject, Extract<TPickKeys, TKey>>
    >

    const pickedLightObject = {} as TPickedLightObject
    for (const key in pick) {
      if (pick[key] === true) {
        // TODO: fix this keying type
        pickedLightObject[key as unknown as keyof TPickedLightObject] =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          lightObject[key] as unknown as any
      }
    }

    return LtObject.create(pickedLightObject)
  }

  /**
   * Disallows extra keys in the input.
   *
   * ```ts
   * const Entity = lt
   *  .object({
   *    id: lt.number(),
   *  })
   *  .strict()
   *
   * const obj = Entity.parse({ id: 1, name: "FooBar" })
   * //                   ^ Error!
   * ```
   */
  strict = () => {
    return LtObject.create(this.shape, {
      ...this.functors,
      extraKeys: 'strict',
    })
  }

  /**
   * Passes through extra keys in the input.
   *
   * ```ts
   * const Entity = lt
   *  .object({
   *    id: lt.number(),
   *  })
   *  .strict()
   *
   * const obj = Entity.parse({ id: 1, name: "FooBar" })
   * // `{ id: 1, name: "FooBar" }`
   * ```
   */
  passthrough = () => {
    return LtObject.create(this.shape, {
      ...this.functors,
      extraKeys: 'passthrough',
    })
  }

  /**
   * Marks all keys in this object as optional
   *
   * ```ts
   * const Entity = lt
   *  .object({
   *    id: lt.string(),
   *    name: lt.string(),
   *  })
   *  .optional()
   *
   * const obj = Entity.parse({ })
   * // `{ }`
   * ```
   */
  partial = () => {
    type TNextLO = {
      [key in keyof TLightObject]: ReturnType<TLightObject[key]['optional']>
    }

    const keys = Object.keys(this.shape) as TKey[]
    const shape = this.shape

    const nextShape: TNextLO = {} as TNextLO
    for (const key of keys) {
      const valueShape = shape[key]

      nextShape[key] = valueShape.optional() as any
    }

    return LtObject.create(nextShape)
  }

  /**
   * Marks all keys in this object as required
   *
   * ```ts
   * const Entity = lt
   *  .object({
   *    id: lt.string().optional(),
   *    name: lt.string().optional(),
   *  })
   *  .required()
   *
   * const obj = Entity.parse({ })
   * //                   ^ Error
   * ```
   */
  required = () => {
    type TNextLO = {
      [key in keyof TLightObject]: ReturnType<TLightObject[key]['required']>
    }

    const keys = Object.keys(this.shape) as TKey[]
    const shape = this.shape

    const nextShape: TNextLO = {} as TNextLO
    for (const key of keys) {
      const valueShape = shape[key]

      nextShape[key] = valueShape.required() as any
    }

    return LtObject.create(nextShape)
  }
}
