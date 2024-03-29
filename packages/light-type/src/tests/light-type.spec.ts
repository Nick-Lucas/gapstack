/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'
import { aggregated, throws } from './errors'

describe('lightType', () => {
  describe('complex case', () => {
    const fooBarLiteral = ['foo', 'bar'] as const
    const fooBarLiteral2 = [0, 'bar'] as const

    const tObj = lt.object({
      deepOptionalNum: lt.number().nullable(),
      deepDate: lt.date(),
      deepString: lt.string(),
      deepLiteral: lt.literal(fooBarLiteral2),
    })
    const tSubject = lt.object({
      someNum: lt.number(),
      someOptionalNum: lt.number().optional(),
      someDate: lt.date(),
      someString: lt.string(),
      someLiteral: lt.literal(fooBarLiteral),
      obj: tObj,
      arr: lt.array(tObj),
    })

    it('errors', () => {
      const input = {
        someNum: undefined,
        someOptionalNum: undefined,
        someDate: new Date(),
        someString: 'Random String',
        someLiteral: 'bar',
        obj: {
          deepOptionalNum: null,
          deepDate: new Date(),
          deepString: null,
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
            deepDate: null,
            deepString: 'Random String 2',
            deepLiteral: null,
          },
        ],
      }

      throws(
        () => tSubject.parse(input as any),
        aggregated(
          {
            type: 'required',
            path: 'someNum',
            message: 'Not a Number',
            value: undefined,
          },
          {
            type: 'required',
            path: 'obj.deepString',
            message: 'Not a String',
            value: null,
          },
          {
            type: 'required',
            path: 'arr.1.deepDate',
            message: 'Not a Date',
            value: null,
          },
          {
            type: 'required',
            path: 'arr.1.deepLiteral',
            message: 'Does not match literal, expected one of: 0, bar',
            value: null,
          }
        )
      )
    })

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

      expect(tSubject.parse(input)).toEqual(input)
    })
  })
})
