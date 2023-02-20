/* eslint-disable @typescript-eslint/no-explicit-any */

import { InferInput, lt } from '..'
import { aggregated, throws } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  lt.tuple([lt.string()])
  lt.tuple([lt.string(), lt.boolean()])

  // @ts-expect-error tuples must have at least 1 element
  lt.tuple([])
}

describe('tuple', () => {
  describe('simple object with primitive types', () => {
    const tuple = lt.tuple([lt.string(), lt.number().optional()])

    it('should parse', () => {
      const input = ['Foo', undefined] as InferInput<typeof tuple>

      expect(tuple.parse(input)).toEqual([...input])
    })

    it('should throw for wrong number of elements', () => {
      const input = ['Foo']

      throws(
        () => tuple.parse(input as any),
        aggregated({
          type: 'length',
          message: 'Invalid Tuple: 1 elements instead of 2',
          value: ['Foo'],
        })
      )
    })

    it('should throw for not being a tuple', () => {
      throws(
        () => tuple.parse({} as any),
        aggregated({
          type: 'required',
          message: 'Not a Tuple',
          value: {},
        })
      )
    })

    it('should throw for an element being invalid', () => {
      throws(
        () => tuple.parse([-1, 0]),
        aggregated({
          type: 'required',
          message: 'Not a String',
          value: -1,
          path: '0',
        })
      )
    })

    it('should permit optional', () => {
      const simpleObject = tuple.optional()

      expect(simpleObject.parse(undefined)).toEqual(undefined)
    })
  })
})
