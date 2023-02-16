/* eslint-disable @typescript-eslint/no-explicit-any */

import { InferInput, lt } from '..'
import { LightTypeError } from '../lib/errors/LightTypeError'
import { aggregated, throws } from './errors'

describe('map', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function checkTypes() {
    lt.map(lt.any(), lt.boolean())
    lt.map(lt.string(), lt.boolean())
    lt.map(lt.number(), lt.boolean())

    // @ts-expect-error keys should not be nullable
    lt.map(lt.string().nullable(), lt.boolean())

    // @ts-expect-error keys should not be optional
    lt.map(lt.string().optional(), lt.boolean())

    // @ts-expect-error booleans are not keys
    lt.map(lt.boolean(), lt.boolean())

    // @ts-expect-error objects are not keys
    lt.map(lt.object({}), lt.boolean())
  }

  describe('simple object with primitive types', () => {
    const simpleObject = lt.map(lt.string(), lt.boolean())

    it('should parse', () => {
      const input = {
        foo: true,
        bar: false,
      } as InferInput<typeof simpleObject>

      expect(simpleObject.parse(input)).toEqual(new Map(Object.entries(input)))
    })

    it('should throw', () => {
      const input = {
        foo: true,
        bar: undefined,
      } as any

      throws(
        () => simpleObject.parse(input),
        aggregated(
          new LightTypeError({
            message: 'Not a Boolean',
            value: undefined,
            path: 'bar',
          })
        )
      )
    })

    it('should permit optional', () => {
      const simpleObject = lt.map(lt.string(), lt.boolean().optional())

      const input = {
        foo: true,
        bar: undefined,
      } as any

      expect(simpleObject.parse(input)).toEqual(new Map(Object.entries(input)))
    })
  })
})
