import {
  LightObject,
  InferLightObjectInput,
  InferLightObjectOutput,
} from './base-types'
import { ChainableType } from './ChainableType'
import { lt } from './light-type'
import { mergeLightObjects } from './mergeLightObjects'
import { Simplify } from './util-types'

type OmitParam<T> = { [TKey in keyof T]?: true }

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

  omit = <TOmit extends OmitParam<TLightObject>>(omit: TOmit) => {
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
}
