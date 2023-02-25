import {
  AnyLightObject,
  InferLightObjectInput,
  InferLightObjectOutput,
} from '../types/LightObject'
import { LtType } from './LtType'
import * as lt from '../lt'
import { mergeLightObjects } from '../mergeLightObjects'
import { Simplify } from '../types/utils'
import { TypeInner } from '../types/TypeInner'
import { LightType } from '../types/LightType'

type KeysParam<T> = { [TKey in keyof T]?: true }

type GetTInput<LO extends AnyLightObject> = Simplify<InferLightObjectInput<LO>>
type GetTOutput<LO extends AnyLightObject> = Simplify<
  InferLightObjectOutput<LO>
>
type GetTKey<A extends AnyLightObject, B, C> =
  | Extract<keyof A, string> &
      Extract<keyof B, string> &
      Extract<keyof C, string>

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
  constructor(t: TypeInner<TInput, TOutput>, readonly shape: TLightObject) {
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
  >(shape: TLightObject) {
    const keys = Object.keys(shape) as TKey[]

    return new LtObject<TLightObject, TInput, TOutput, TKey>(
      {
        parse(input, ctx) {
          if (typeof input === 'object' && input !== null) {
            const obj = input as TInput

            return keys.reduce((aggr, key) => {
              const parser = shape[key]

              aggr[key] = parser._t.parse(
                obj[key],
                ctx.createChild(key)
              ) as TOutput[TKey]

              return aggr
            }, {} as TOutput)
          }

          ctx.addIssue({
            type: 'required',
            message: `Not an Object`,
            value: input,
          })

          return ctx.NEVER
        },
      },
      shape
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

    return lt.object(extendedLightObject)
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

    return lt.object(extendedLightObject)
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

    return lt.object(omittedLightObject)
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

    return lt.object(pickedLightObject)
  }

  strict = () => {
    const t = this._t
    const keys = new Set(Object.keys(this.shape))

    return new LtObject<TLightObject, TInput, TOutput, TKey>(
      {
        parse(input, ctx) {
          const result = t.parse(input, ctx)
          if (ctx.anyIssue()) {
            return ctx.NEVER
          }

          if (
            typeof result === 'object' &&
            typeof input === 'object' &&
            !!result &&
            !!input
          ) {
            const inputKeys = Object.keys(input)
            for (const inputKey of inputKeys) {
              if (!keys.has(inputKey)) {
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

          return result
        },
      },
      this.shape
    )
  }

  passthrough = () => {
    const t = this._t
    const keys = new Set(Object.keys(this.shape))

    return new LtObject<TLightObject, TInput, TOutput, TKey>(
      {
        parse(input, ctx) {
          const result = t.parse(input, ctx)
          if (ctx.anyIssue()) {
            return ctx.NEVER
          }

          if (
            typeof result === 'object' &&
            typeof input === 'object' &&
            !!result &&
            !!input
          ) {
            const inputKeys = Object.keys(input)
            for (const inputKey of inputKeys) {
              if (!keys.has(inputKey)) {
                // Maybe: Could produce an issue per extra key?

                result[inputKey as keyof TOutput] =
                  input[inputKey as keyof typeof input]
              }
            }
          }

          return result
        },
      },
      this.shape
    )
  }

  partial = () => {
    type TNextLO = {
      [key in keyof TLightObject]: TLightObject[key] extends LightType<
        infer TI,
        infer TO
      >
        ? LightType<TI | undefined, TO | undefined>
        : never
    }
    type TNextInput = GetTInput<TNextLO>
    type TNextOutput = GetTOutput<TNextLO>
    type TNextKey = GetTKey<TNextLO, TNextInput, TNextOutput>

    const keys = Object.keys(this.shape) as TNextKey[]
    const shape = this.shape

    return new LtObject<TNextLO, TNextInput, TNextOutput, TNextKey>(
      {
        parse(input, ctx) {
          if (typeof input === 'object' && input !== null) {
            const obj = input as TNextInput

            return keys.reduce((aggr, key) => {
              const parser = shape[key]

              if (obj[key] === undefined) {
                aggr[key] = undefined as any
              } else {
                aggr[key] = parser._t.parse(
                  obj[key],
                  ctx.createChild(key)
                ) as any
              }

              return aggr
            }, {} as TNextOutput)
          }

          ctx.addIssue({
            type: 'required',
            message: `Not an Object`,
            value: input,
          })

          return ctx.NEVER
        },
      },
      shape as unknown as TNextLO
    )
  }
}
