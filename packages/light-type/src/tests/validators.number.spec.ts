import { lt } from '..'
import { numbers } from '../lib/validators'

import { aggregated } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  lt.number().pipe(numbers.max(1))
  lt.number().pipe(numbers.max(10), numbers.min(1))
}

describe('number validators', () => {
  describe('min', () => {
    const t = lt.number().pipe(numbers.min(1))

    it.each([1, 2, 1.01])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each([0.99999, 0, -1, -2])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated({
          type: 'required',
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
          type: 'required',
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
          type: 'required',
          message: 'Max Value is 10',
          value: value,
        })
      )
    })

    it.each([0])('throws under min', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated({
          type: 'required',
          message: 'Min Value is 1',
          value: value,
        })
      )
    })
  })
})
