/* eslint-disable @typescript-eslint/no-explicit-any */

import { InferInput, lt } from '..'
import { aggregated, throws } from './errors'

describe('record', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function checkTypes() {
    lt.record(lt.string(), lt.boolean())
    lt.record(lt.number(), lt.boolean())

    // @ts-expect-error keys should not be nullable
    lt.record(lt.string().nullable(), lt.boolean())

    // @ts-expect-error keys should not be optional
    lt.record(lt.string().optional(), lt.boolean())

    // @ts-expect-error booleans are not keys
    lt.record(lt.boolean(), lt.boolean())

    // @ts-expect-error objects are not keys
    lt.record(lt.object({}), lt.boolean())
  }

  describe('simple object with primitive types', () => {
    const simpleObject = lt.record(lt.string(), lt.boolean())

    it('should parse', () => {
      const input = {
        foo: true,
        bar: false,
      } as InferInput<typeof simpleObject>

      expect(simpleObject.parse(input)).toEqual({
        ...input,
      })
    })

    it('should throw', () => {
      const input = {
        foo: true,
        bar: undefined,
      } as any

      throws(
        () => simpleObject.parse(input),
        aggregated({
          type: 'required',
          message: 'Not a Boolean',
          value: undefined,
          path: 'bar',
        })
      )
    })

    it('should permit optional', () => {
      const simpleObject = lt.record(lt.string(), lt.boolean().optional())

      const input = {
        foo: true,
        bar: undefined,
      } as any

      expect(simpleObject.parse(input)).toEqual({
        ...input,
      })
    })
  })
})
