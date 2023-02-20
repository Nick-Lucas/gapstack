import { lt } from '..'
import { numbers } from '../lib/validators'

import { aggregated, throws } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  lt.number().pipe(numbers.max(1))
  lt.number().pipe(numbers.max(10), numbers.min(1))
}

describe('chainable validators', () => {
  const Num = lt.number()

  it.each([1, 2])('checks min %p', (val) => {
    expect(Num.min(1).check(val)).toEqual(val)
  })

  it.each([0])('checks min rejects %p', (val) => {
    throws(
      () => Num.min(1).check(val),
      aggregated({
        message: 'Min Value is 1',
        type: 'min',
        value: val,
      })
    )
  })

  it.each([1, 2])('checks max %p', (val) => {
    expect(Num.max(2).check(val)).toEqual(val)
  })

  it.each([2])('checks max rejects %p', (val) => {
    throws(
      () => Num.max(1).check(val),
      aggregated({
        message: 'Max Value is 1',
        type: 'max',
        value: val,
      })
    )
  })
})

describe('number validators', () => {
  describe('min', () => {
    const t = lt.number().pipe(numbers.min(1))

    it.each([1, 2, 1.01])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each([0.99999, 0, -1, -2])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated({
          type: 'min',
          message: 'Min Value is 1',
          value: value,
        })
      )
    })
  })

  describe('max', () => {
    const t = lt.number().pipe(numbers.max(10))

    it.each([10, 9.999, -11])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each([11, 10.0001, 50])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated({
          type: 'max',
          message: 'Max Value is 10',
          value: value,
        })
      )
    })
  })

  describe('chaining', () => {
    const t = lt.number().pipe(numbers.min(1), numbers.max(10))

    it.each([1, 5, 10])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each([11])('throws over max', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated({
          type: 'max',
          message: 'Max Value is 10',
          value: value,
        })
      )
    })

    it.each([0])('throws under min', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated({
          type: 'min',
          message: 'Min Value is 1',
          value: value,
        })
      )
    })
  })
})
