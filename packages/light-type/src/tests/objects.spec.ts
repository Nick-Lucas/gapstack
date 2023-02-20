/* eslint-disable @typescript-eslint/no-explicit-any */

import { InferInput, lt } from '..'
import { aggregated, throws } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  const El = lt.object({ name: lt.string().optional() })
  const Obj = lt.object({
    id: lt.number(),
    items: lt.array(El),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a1: { id: number; items: { name?: string }[] } = Obj._input

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a2: { id: number; items: { name?: string }[] } = Obj._output
}

describe('object', () => {
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

      throws(
        () => simpleObject.parse({ ...input }),
        aggregated(
          {
            type: 'required',
            path: 'num',
            message: 'Not a Number',
            value: undefined,
          },
          {
            type: 'required',
            path: 'str',
            message: 'Not a String',
            value: undefined,
          },
          {
            type: 'required',
            path: 'bool',
            message: 'Not a Boolean',
            value: undefined,
          }
        )
      )
    })
  })
})

describe('object methods', () => {
  describe('merge', () => {
    const simpleObject = lt.object({
      num: lt.number(),
      str: lt.string(),
      bool: lt.boolean(),
    })

    const mergedObject = simpleObject.merge({
      id: lt.number(),
      createdAt: lt.date(),
      createdBy: lt.string().default('unknown'),
      // Overide:
      num: lt.boolean(),
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function checkTypes() {
      // @ts-expect-error Object types should be inferred by typescript and not permit an empty object assignment
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const a: InferInput<typeof mergedObject> = {}

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numIsReplacedByBool: boolean = mergedObject._output.num
    }

    it('should parse a merged type', () => {
      const input = {
        id: 1542,
        num: true,
        str: 'hello',
        bool: false,
        createdAt: new Date(),
        createdBy: undefined,
      }

      expect(mergedObject.parse({ ...input })).toEqual({
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

      throws(
        () => mergedObject.parse({ ...input }),
        aggregated(
          {
            type: 'required',
            path: 'id',
            message: 'Not a Number',
            value: undefined,
          },
          {
            type: 'required',
            path: 'num',
            message: 'Not a Boolean',
            value: 1,
          },
          {
            type: 'required',
            path: 'createdAt',
            message: 'Not a Date',
            value: undefined,
          }
        )
      )
    })
  })

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
      // Will be stripped:
      num: lt.boolean(),
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function checkTypes() {
      // @ts-expect-error Object types should be inferred by typescript and not permit an empty object assignment
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const a: InferInput<typeof mergedObject> = {}

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numIsReplacedByBool: number = extendedObject._output.num
    }

    it('should parse a merged type', () => {
      const input = {
        id: 1542,
        num: 1,
        str: 'hello',
        bool: false,
        createdAt: new Date(),
        createdBy: undefined,
      }

      expect(extendedObject.parse({ ...input })).toEqual({
        ...input,
        createdBy: 'unknown',
      })
    })

    it('should throw a invalid', () => {
      const input = {
        num: true,
        str: 'hello',
        bool: false,
      } as any

      throws(
        () => extendedObject.parse({ ...input }),
        aggregated(
          {
            type: 'required',
            path: 'id',
            message: 'Not a Number',
            value: undefined,
          },
          {
            type: 'required',
            path: 'num',
            message: 'Not a Number',
            value: true,
          },
          {
            type: 'required',
            path: 'createdAt',
            message: 'Not a Date',
            value: undefined,
          }
        )
      )
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

    it('should parse a omitted type', () => {
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

      throws(
        () => omittedObject.parse({ ...input }),
        aggregated({
          type: 'required',
          path: 'bool',
          message: 'Not a Boolean',
          value: null,
        })
      )
    })
  })

  describe('pick', () => {
    const simpleObject = lt.object({
      id: lt.number(),
      num: lt.number(),
      str: lt.string(),
      bool: lt.boolean(),
      createdAt: lt.date(),
      createdBy: lt.string().default('unknown'),
    })

    const pickedObject = simpleObject.pick({
      id: true,
      createdBy: true,
      createdAt: true,
    })

    it('picks', () => {
      const input = {
        id: 1,
        num: 1,
        str: 'Foo',
        bool: true,
        createdAt: new Date(),
        createdBy: undefined,
      }

      expect(pickedObject.parse(input)).toEqual({
        id: 1,
        createdAt: input.createdAt,
        createdBy: 'unknown',
      })
    })

    it('throws', () => {
      const input = {
        num: 1,
        str: 'Foo',
        bool: true,
        createdAt: new Date(),
        createdBy: undefined,
      } as any

      throws(
        () => pickedObject.parse(input),
        aggregated({
          type: 'required',
          message: 'Not a Number',
          path: 'id',
          value: undefined,
        })
      )
    })
  })
})
