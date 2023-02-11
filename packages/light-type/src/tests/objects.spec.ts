/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'

describe('lightType', () => {
  describe('extend', () => {
    const simpleObject = lt.object({
      num: lt.number(),
      str: lt.string(),
      bool: lt.boolean(),
    })

    const extendedObject = simpleObject.extend({
      id: lt.number(),
      createdAt: lt.date(),
      createdBy: lt.string().default('unknown'),
      // Overide:
      num: lt.boolean(),
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function checkTypes() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numIsReplacedByBool: boolean = extendedObject._output.num
    }

    it('should parse a extended type', () => {
      const input = {
        id: 1542,
        num: true,
        str: 'hello',
        bool: false,
        createdAt: new Date(),
        createdBy: null,
      }

      expect(extendedObject.parse({ ...input })).toEqual({
        ...input,
        createdBy: 'unknown',
      })
    })

    it('should throw a invalid', () => {
      const input = {
        num: 1,
        str: 'hello',
        bool: false,
      } as any

      // TODO: assert some exact aggregated error
      expect(() => extendedObject.parse({ ...input })).toThrowError(Error)
    })
  })

  describe('omit', () => {
    const simpleObject = lt.object({
      id: lt.number(),
      num: lt.number(),
      str: lt.string(),
      bool: lt.boolean(),
      createdAt: lt.date(),
      createdBy: lt.string().default('unknown'),
    })

    const omittedObject = simpleObject.omit({
      id: true,
      createdBy: true,
      createdAt: true,
    })

    it('should parse a ommitted type', () => {
      const input = {
        num: 1,
        str: 'hello',
        bool: false,
      }

      expect(omittedObject.parse({ ...input })).toEqual({
        ...input,
      })
    })

    it('should throw a invalid', () => {
      const input = {
        num: 1,
        str: 'hello',
        bool: null,
      } as any

      // TODO: assert some exact aggregated error
      expect(() => omittedObject.parse({ ...input })).toThrowError(Error)
    })
  })
})
