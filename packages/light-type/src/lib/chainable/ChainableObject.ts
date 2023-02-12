import {
  LightObject,
  InferLightObjectInput,
  InferLightObjectOutput,
} from '../types/LightObject'
import { ChainableType } from './ChainableType'
import { lt } from '../lt'
import { mergeLightObjects } from '../mergeLightObjects'
import { Simplify } from '../types/utils'
import { LightTypeError } from '../errors/LightTypeError'
import { LightTypeAggregatedErrors } from '../errors/LightTypeAggregatedErrors'

type KeysParam<T> = { [TKey in keyof T]?: true }

type TI<LO extends LightObject> = Simplify<InferLightObjectInput<LO>>
type TO<LO extends LightObject> = Simplify<InferLightObjectOutput<LO>>

export class ChainableObject<
  TKey extends string,
  TLightObject extends LightObject<TKey>,
  TInput extends TI<TLightObject> = TI<TLightObject>,
  TOutput extends TO<TLightObject> = TO<TLightObject>
> extends ChainableType<TInput, TOutput> {
  constructor(protected readonly lightObject: TLightObject) {
    const keys = Object.keys(lightObject) as TKey[]

    super({
      parse(input) {
        const errors = new LightTypeAggregatedErrors()

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

  extend = <
    TExtendKey extends string,
    TExtendLightObject extends LightObject<TExtendKey>
  >(
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
          lightObject[key as unknown as TKey] as unknown as any
      }
    }

    return lt.object(pickedLightObject)
  }
}