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
    })

    it('should parse a extended type', () => {
      const input = {
        id: 1542,
        num: 1,
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
})
