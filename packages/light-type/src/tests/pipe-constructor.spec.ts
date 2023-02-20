/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'
import { aggregated } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  lt.pipe(() => '', lt.string())
  lt.pipe((i) => (i === 1 ? ('' as string) : undefined), lt.string().optional())
  lt.pipe((i) => (i === 1 ? 'foo' : undefined), lt.literal('foo').optional())
  lt.pipe((i) => (i === 1 ? 'foo' : undefined), lt.literal(['foo']).optional())
  lt.pipe((i) => (i === 1 ? 'foo' : undefined), lt.literal(['foo']).optional())

  // @ts-expect-error type value should reject anything not compatible with the function output
  lt.pipe(() => '', lt.boolean())
}

describe('pipe-constructor', () => {
  const DateType = lt.pipe((input) => {
    if (input instanceof Date && !isNaN(input.valueOf())) {
      return input
    }

    if (typeof input === 'string' || typeof input === 'number') {
      const maybeDate = new Date(input)
      if (maybeDate instanceof Date && !isNaN(maybeDate.valueOf())) {
        return maybeDate
      }
    }

    return new Date(NaN)
  }, lt.date())

  describe('Before: Parses DateType', () => {
    const date = new Date()

    it.each([date, date.toISOString(), date.valueOf()])(
      'preprocesses a parseable date value',
      (input) => {
        expect(DateType.parse(input)).toEqual(date)
      }
    )

    it.each([null, undefined, '', 'foo'])(
      'rejects a non-parseable value',
      (value) => {
        expect(() => DateType.parse(value)).toThrow(
          aggregated({
            type: 'required',
            message: 'Not a Date',
            value: new Date(NaN),
          })
        )
      }
    )
  })

  describe('scenarios', () => {
    describe('a weird union type with literals', () => {
      const t = lt
        .pipe(
          (i) => (i === 1 ? { name: 'foo' } : { name: 'bar' }),
          lt.union([
            lt.object({
              name: lt.literal('foo'),
              id: lt.string().default('foo-id'),
            }),
            lt.object({
              name: lt.literal('bar'),
              id: lt.string().default('bar-id'),
            }),
          ])
        )
        .seal()

      it('parses the first type', () => {
        expect(t.parse(1)).toEqual({
          name: 'foo',
          id: 'foo-id',
        })
      })

      it('parses the second type', () => {
        expect(t.parse(2)).toEqual({
          name: 'bar',
          id: 'bar-id',
        })
      })
    })
  })
})
