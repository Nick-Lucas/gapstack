/* eslint-disable @typescript-eslint/no-explicit-any */

import { InferInput, lt } from '..'
import { LightTypeError } from '../lib/errors/LightTypeError'
import { aggregated, throws } from './errors'

describe('set', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function checkTypes() {
    lt.set(lt.any())
    lt.set(lt.unknown())
    lt.set(lt.string())
    lt.set(lt.number())
    lt.set(lt.boolean())
    lt.set(lt.object({}))
    lt.set(lt.array(lt.number()))

    // Accepts an invalid input
    lt.set(lt.string()).parse(1)
  }

  describe('simple object with primitive types', () => {
    const set = lt.set(lt.string())

    it('should parse', () => {
      const input = ['Foo', 'Bar'] as InferInput<typeof set>

      expect(set.parse(input)).toEqual(new Set(input))
    })

    it('should throw for not being a set', () => {
      throws(
        () => set.parse({} as any),
        aggregated(
          new LightTypeError({
            message: 'Not a Set or Arraylike',
            value: {},
          })
        )
      )
    })

    it('should throw for an element being invalid', () => {
      throws(
        () => set.parse(['Foo', 0 as any]),
        aggregated(
          new LightTypeError({
            message: 'Not a String',
            value: 0,
            path: '1',
          })
        )
      )
    })

    it('should permit optional', () => {
      const simpleObject = set.optional()

      expect(simpleObject.parse(undefined)).toEqual(undefined)
    })
  })
})
