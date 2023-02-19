/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'
import { LightTypeError } from '../lib/errors/LightTypeError'
import { aggregated, throws } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  //
  // Number Array

  const simpleArray = lt.array(lt.number())

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const n1: number[] = simpleArray._input

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const n2: number[] = simpleArray._output

  //
  // Object Array

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const objectArray = lt.array(
    lt.object({ id: lt.number(), name: lt.string() })
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const o1: { id: number; name: string }[] = objectArray._input

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const o2: { id: number; name: string }[] = objectArray._output
}

describe('arrays', () => {
  describe('array of numbers', () => {
    it('should parse', () => {
      const simpleArray = lt.array(lt.number()).seal()

      expect(simpleArray.parse([1, 2, 3])).toEqual([1, 2, 3])
    })

    it('should throw invalid', () => {
      const simpleArray = lt.array(lt.number()).seal()

      throws(
        () => simpleArray.parse([1, 2, null] as any),
        aggregated(
          new LightTypeError({
            path: '2',
            message: 'Not a Number',
            value: null,
          })
        )
      )
    })
  })

  describe('array of objects', () => {
    const simpleObject = lt.object({
      num: lt.number(),
      str: lt.string(),
      bool: lt.boolean(),
    })

    it('should parse', () => {
      const input = [
        {
          num: 1,
          str: 'hello',
          bool: false,
        },
        {
          num: 1,
          str: 'hello',
          bool: false,
        },
      ]

      const simpleArray = lt.array(simpleObject).seal()

      expect(simpleArray.parse([...input])).toEqual([...input])
    })

    it('should throw invalid', () => {
      const input = [
        {
          num: 1,
          str: 'hello',
          bool: false,
        },
        {
          num: 1,
          str: 'hello',
          bool: null, // Error!
        },
      ]

      const simpleArray = lt.array(simpleObject).seal()

      throws(
        () => simpleArray.parse([...input] as any),
        aggregated(
          new LightTypeError({
            path: '1.bool',
            message: 'Not a Boolean',
            value: null,
          })
        )
      )
    })

    it.each([null, undefined])(
      'should throw invalid for array of %p',
      (input) => {
        const simpleArray = lt.array(simpleObject).seal()

        throws(
          () => simpleArray.parse([input, input, input] as any),
          aggregated(
            new LightTypeError({
              path: '0',
              message: 'Not an Object',
              value: input,
            }),
            new LightTypeError({
              path: '1',
              message: 'Not an Object',
              value: input,
            }),
            new LightTypeError({
              path: '2',
              message: 'Not an Object',
              value: input,
            })
          )
        )
      }
    )

    it('should throw invalid for array of emptys', () => {
      const simpleArray = lt.array(simpleObject).seal()

      throws(
        () => simpleArray.parse(new Array(3) as any),
        aggregated(
          new LightTypeError({
            path: '0',
            message: 'Not an Object',
            value: undefined,
          }),
          new LightTypeError({
            path: '1',
            message: 'Not an Object',
            value: undefined,
          }),
          new LightTypeError({
            path: '2',
            message: 'Not an Object',
            value: undefined,
          })
        )
      )
    })
  })
})
