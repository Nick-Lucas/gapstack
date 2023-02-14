/* eslint-disable @typescript-eslint/no-explicit-any */

import { InferInput, InferOutput, lt } from '..'
import { LightTypeError } from '../lib/errors/LightTypeError'
import { aggregated, throws } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  const sb = lt.union([lt.string(), lt.boolean()])
  type TSB = InferOutput<typeof sb>

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tsbStri: TSB = ''

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tsbBool: TSB = true

  // @ts-expect-error number not in the union
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tsbNumb: TSB = 1

  type HopefullyNever = Exclude<TSB, string | boolean>
  // @ts-expect-error should be `never` and therefore not assignable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a: HopefullyNever = null as any

  // @ts-expect-error unions must have at least 2 elements
  lt.union()

  // @ts-expect-error unions must have at least 2 elements
  lt.union([])

  // @ts-expect-error must have at least two type arguments
  lt.union([lt.string()])
}

describe('union', () => {
  describe('simple object with primitive types', () => {
    const union = lt.union([lt.string(), lt.number().optional()])

    it.each(['Foo', 1, undefined])('should parse %p', (input) => {
      expect(union.parse(input)).toEqual(input)
    })

    it.each([true, null, new Date()])('should reject', () => {
      const input = ['Foo']

      throws(
        () => union.parse(input as any),
        new LightTypeError({
          message: 'No Matching Type in Union',
          value: input,
        })
      )
    })

    it('should permit optional', () => {
      const simpleObject = union.optional()

      expect(simpleObject.parse(undefined)).toEqual(undefined)
    })
  })
})
