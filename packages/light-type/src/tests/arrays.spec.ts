/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'
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

  // Can chain
  objectArray.min(0).optional()
  // @ts-expect-error Should narrow when a base-type method is used
  objectArray.optional().min(0)
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
        aggregated({
          type: 'required',
          path: '2',
          message: 'Not a Number',
          value: null,
        })
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
        aggregated({
          type: 'required',
          path: '1.bool',
          message: 'Not a Boolean',
          value: null,
        })
      )
    })

    it.each([null, undefined])(
      'should throw invalid for array of %p',
      (input) => {
        const simpleArray = lt.array(simpleObject).seal()

        throws(
          () => simpleArray.parse([input, input, input] as any),
          aggregated(
            {
              type: 'required',
              path: '0',
              message: 'Not an Object',
              value: input,
            },
            {
              type: 'required',
              path: '1',
              message: 'Not an Object',
              value: input,
            },
            {
              type: 'required',
              path: '2',
              message: 'Not an Object',
              value: input,
            }
          )
        )
      }
    )

    it('should throw invalid for array of emptys', () => {
      const simpleArray = lt.array(simpleObject).seal()

      throws(
        () => simpleArray.parse(new Array(3) as any),
        aggregated(
          {
            type: 'required',
            path: '0',
            message: 'Not an Object',
            value: undefined,
          },
          {
            type: 'required',
            path: '1',
            message: 'Not an Object',
            value: undefined,
          },
          {
            type: 'required',
            path: '2',
            message: 'Not an Object',
            value: undefined,
          }
        )
      )
    })
  })

  describe('validation', () => {
    const simpleArray = lt.array(lt.number())

    it.each([1, 2])('checks min %p', (val) => {
      const array = new Array(val).fill(-1)
      expect(simpleArray.min(1).check([...array])).toEqual([...array])
    })

    it.each([0])('checks min rejects %p', (val) => {
      const array = new Array(val).fill(-1)

      throws(
        () => simpleArray.min(1).check(array),
        aggregated({
          message: 'Min Length is 1',
          type: 'min',
          value: array,
        })
      )
    })

    it.each([1, 2])('checks max %p', (val) => {
      const array = new Array(val).fill(-1)
      expect(simpleArray.max(2).check([...array])).toEqual([...array])
    })

    it.each([2])('checks max rejects %p', (val) => {
      const array = new Array(val).fill(-1)

      throws(
        () => simpleArray.max(1).check(array),
        aggregated({
          message: 'Max Length is 1',
          type: 'max',
          value: array,
        })
      )
    })

    it.each([2])('checks length %p', (val) => {
      const array = new Array(val).fill(-1)
      expect(simpleArray.length(2).check([...array])).toEqual([...array])
    })

    it.each([1, 3])('checks length rejects %p', (val) => {
      const array = new Array(val).fill(-1)

      throws(
        () => simpleArray.length(2).check(array),
        aggregated({
          message: 'Expected Length is 2',
          type: 'length',
          value: array,
        })
      )
    })
  })
})
