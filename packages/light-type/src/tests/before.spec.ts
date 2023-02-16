/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'
import { LightTypeError } from '../lib/errors/LightTypeError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  lt.before(() => '', lt.string())
  lt.before(
    (i) => (i === 1 ? ('' as string) : undefined),
    lt.string().optional()
  )
  lt.before(
    (i) => (i === 1 ? 'foo' : undefined),
    lt.literal(['foo']).optional()
  )

  // @ts-expect-error type value should reject anything not compatible with the function output
  lt.before(() => '', lt.boolean())
}

describe('before', () => {
  const DateType = lt.before((input) => {
    if (input instanceof Date && !isNaN(input.valueOf())) {
      return input
    }

    if (typeof input === 'string' || typeof input === 'number') {
      const maybeDate = new Date(input)
      if (maybeDate instanceof Date && !isNaN(maybeDate.valueOf())) {
        return maybeDate
      }
    }

    return null
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
          new LightTypeError({
            message: 'Not a Date',
            value: value,
          })
        )
      }
    )
  })
})
