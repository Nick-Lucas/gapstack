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

type KeysParam<T> = { [TKey in keyof T]?: true }

type GetTInput<LO extends AnyLightObject> = Simplify<InferLightObjectInput<LO>>
type GetTOutput<LO extends AnyLightObject> = Simplify<
  InferLightObjectOutput<LO>
>
type GetTKey<A extends AnyLightObject, B, C> =
  | Extract<keyof A, string> &
      Extract<keyof B, string> &
      Extract<keyof C, string>

interface ObjectOptions {
  extraKeysModes: 'discard' | 'strict' | 'passthrough'
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
    protected readonly options: ObjectOptions
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
  >(shape: TLightObject, _options?: Partial<ObjectOptions>) {
    const keys = Object.keys(shape) as TKey[]

    const options: ObjectOptions = {
      extraKeysModes: _options?.extraKeysModes ?? 'discard',
    }

    return new LtObject<TLightObject, TInput, TOutput, TKey>(
      {
        parse(input, ctx) {
          if (typeof input === 'object' && input !== null) {
            const obj = input as TInput

            const initialOutput =
              options?.extraKeysModes === 'discard'
                ? {}
                : Object.keys(input).reduce((aggr, key) => {
                    if ((keys as string[]).includes(key) === false) {
                      aggr[key] = input[key as keyof typeof input]
                    }
                    return aggr
                  }, {} as Record<string, unknown>)

            if (
              options?.extraKeysModes === 'strict' &&
              Object.keys(initialOutput).length > 0
            ) {
              ctx.addIssue({
                type: 'strict',
                message: `Extra keys found`,
                value: input,
              })
              return ctx.NEVER
            }

            return keys.reduce((aggr, key) => {
              const parser = shape[key]

              aggr[key] = parser._t.parse(
                obj[key],
                ctx.createChild(key)
              ) as TOutput[TKey]

              return aggr
            }, initialOutput as TOutput)
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
      options
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

  strict = () =>
    new LtObject(this._t, this.shape, {
      ...this.options,
      extraKeysModes: 'strict',
    })

  passthrough = () =>
    new LtObject(this._t, this.shape, {
      ...this.options,
      extraKeysModes: 'passthrough',
    })
}
