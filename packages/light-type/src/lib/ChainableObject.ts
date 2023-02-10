import {
  InferLightObjectInput,
  InferLightObjectOutput,
  LightObject,
} from './base-types'
import { ChainableType } from './ChainableType'
import { Simplify } from './util-types'

export class ChainableObject<TInput, TOutput = TInput> extends ChainableType<
  TInput,
  TOutput
> {
  extend = <TKey extends string, TLightObject extends LightObject<TKey>>(
    lightObject: TLightObject
  ) => {
    const t = this.t

    const keys = Object.keys(lightObject) as TKey[]

    type TExtendedInput = Simplify<InferLightObjectInput<TLightObject>> & TInput
    type TExtendedOutput = Simplify<InferLightObjectOutput<TLightObject>> &
      TOutput

    return new ChainableObject<TExtendedInput, TExtendedOutput>({
      parse(input) {
        if (typeof input === 'object' && input !== null) {
          const obj = input as TExtendedInput

          const superObject = t.parse(input)

          // TODO: this is identical to the lt.object() method, abstract it out?
          return keys.reduce((aggr, key) => {
            const parser = lightObject[key]

            // TODO: catch and aggregate errors?
            // TODO: fix any type
            aggr[key] = parser.parse(obj[key]) as any

            return aggr
          }, superObject as TExtendedOutput)
        }

        throw new Error(`Not an Object, received "${input}"`)
      },
    })
  }
}
