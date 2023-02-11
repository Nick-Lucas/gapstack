/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'

describe('lightType', () => {
  describe('simple object with primitive types', () => {
    it('should parse', () => {
      const simpleObject = lt
        .object({
          num: lt.number(),
          str: lt.string(),
          bool: lt.boolean(),
        })
        .seal()

      const input = {
        num: 1,
        str: 'hello',
        bool: false,
      }

      expect(simpleObject.parse({ ...input })).toEqual({
        ...input,
      })
    })

    it('should throw a invalid', () => {
      const simpleObject = lt
        .object({
          num: lt.number(),
          str: lt.string(),
          bool: lt.boolean(),
        })
        .seal()

      const input = {
        num: undefined,
        str: undefined,
        bool: undefined,
      } as any

      // TODO: assert some exact aggregated error
      expect(() => simpleObject.parse({ ...input })).toThrowError(Error)
    })
  })

  describe('array of numbers', () => {
    it('should parse', () => {
      const simpleArray = lt.array(lt.number()).seal()

      expect(simpleArray.parse([1, 2, 3])).toEqual([1, 2, 3])
    })

    it('should throw invalid', () => {
      const simpleArray = lt.array(lt.number()).seal()

      expect(() => simpleArray.parse([1, 2, null] as any)).toThrowError(Error)
    })
  })

  describe('array of objects', () => {
    const simpleObject = lt
      .object({
        num: lt.number(),
        str: lt.string(),
        bool: lt.boolean(),
      })
      .seal()

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

      expect(() => simpleArray.parse([...input] as any)).toThrowError(Error)
    })

    it.each([null, undefined])(
      'should throw invalid for array of %p',
      (input) => {
        const simpleArray = lt.array(simpleObject).seal()

        expect(() =>
          simpleArray.parse([input, input, input] as any)
        ).toThrowError(Error)
      }
    )

    it('should throw invalid for array of emptys', () => {
      const simpleArray = lt.array(simpleObject).seal()

      expect(() => simpleArray.parse(new Array(3) as any)).toThrowError(Error)
    })
  })

  describe('complex case', () => {
    const fooBarLiteral = ['foo', 'bar'] as const
    const fooBarLiteral2 = [0, 'bar'] as const

    const tObj = lt.object({
      deepOptionalNum: lt.number().nullable(),
      deepDate: lt.date(),
      deepString: lt.string(),
      deepLiteral: lt.literal(fooBarLiteral2),
    })
    const t = lt
      .object({
        someNum: lt.number(),
        someOptionalNum: lt.number().optional(),
        someDate: lt.date(),
        someString: lt.string(),
        someLiteral: lt.literal(fooBarLiteral),
        obj: tObj,
        arr: lt.array(tObj),
      })
      .seal()

    it('parses', () => {
      const input = {
        someNum: 1,
        someOptionalNum: undefined,
        someDate: new Date(),
        someString: 'Random String',
        someLiteral: 'bar',
        obj: {
          deepOptionalNum: null,
          deepDate: new Date(),
          deepString: 'Random String 2',
          deepLiteral: 'bar',
        },
        arr: [
          {
            deepOptionalNum: null,
            deepDate: new Date(),
            deepString: 'Random String 2',
            deepLiteral: 0,
          },
          {
            deepOptionalNum: null,
            deepDate: new Date(),
            deepString: 'Random String 2',
            deepLiteral: 'bar',
          },
        ],
      }

      expect(t.parse(input)).toEqual(input)
    })
  })
})
