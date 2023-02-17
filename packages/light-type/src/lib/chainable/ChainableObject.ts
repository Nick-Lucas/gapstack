import {
  AnyLightObject,
  InferLightObjectInput,
  InferLightObjectOutput,
} from '../types/LightObject'
import { ChainableType } from './ChainableType'
import { lt } from '../lt'
import { mergeLightObjects } from '../mergeLightObjects'
import { Simplify } from '../types/utils'
import { LightTypeError } from '../errors/LightTypeError'
import { LightTypeErrorAggregator } from '../errors/LightTypeAggregatedErrors'

type KeysParam<T> = { [TKey in keyof T]?: true }

type GetTInput<LO extends AnyLightObject> = Simplify<InferLightObjectInput<LO>>
type GetTOutput<LO extends AnyLightObject> = Simplify<
  InferLightObjectOutput<LO>
>
type GetTKey<A extends AnyLightObject, B, C> =
  | Extract<keyof A, string> &
      Extract<keyof B, string> &
      Extract<keyof C, string>

export class ChainableObject<
  TLightObject extends AnyLightObject,
  TInput extends GetTInput<TLightObject> = GetTInput<TLightObject>,
  TOutput extends GetTOutput<TLightObject> = GetTOutput<TLightObject>,
  TKey extends GetTKey<TLightObject, TInput, TOutput> = GetTKey<
    TLightObject,
    TInput,
    TOutput
  >
> extends ChainableType<TInput, TOutput> {
  constructor(protected readonly lightObject: TLightObject) {
    const keys = Object.keys(lightObject) as TKey[]

    super({
      parse(input) {
        const errors = new LightTypeErrorAggregator()

        if (typeof input === 'object' && input !== null) {
          const obj = input as TInput

          const output = keys.reduce((aggr, key) => {
            const parser = lightObject[key]

            errors.aggregate(key, () => {
              // TODO: fix any type
              aggr[key] = parser.parse(obj[key]) as any
            })

            return aggr
          }, {} as TOutput)

          errors.throwIfAny()

          return output
        }

        throw new LightTypeError({
          message: `Not an Object`,
          value: input,
        })
      },
    })
  }

  extend = <TExtendLightObject extends AnyLightObject>(
    extendLightObject: TExtendLightObject
  ) => {
    const lightObject = this.lightObject

    const extendedLightObject = mergeLightObjects(
      extendLightObject,
      lightObject
    )

    return lt.object(extendedLightObject)
  }

  merge = <TExtendLightObject extends AnyLightObject>(
    extendLightObject: TExtendLightObject
  ) => {
    const lightObject = this.lightObject

    const extendedLightObject = mergeLightObjects(
      lightObject,
      extendLightObject
    )

    return lt.object(extendedLightObject)
  }

  omit = <TOmit extends KeysParam<TLightObject>>(omit: TOmit) => {
    const lightObject = this.lightObject

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

  pick = <TPick extends KeysParam<TLightObject>>(pick: TPick) => {
    const lightObject = this.lightObject

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
}
