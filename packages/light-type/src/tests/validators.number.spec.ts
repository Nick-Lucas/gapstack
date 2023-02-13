import { lt } from '..'
import { LightTypeError } from '../lib/errors/LightTypeError'

describe('number validators', () => {
  describe('min', () => {
    const t = lt.number().min(1)

    it.each([1, 2, 1.01])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each([0.99999, 0, -1, -2])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        new LightTypeError({
          message: 'Min Value is 1',
          value: value,
        })
      )
    })
  })

  describe('max', () => {
    const t = lt.number().max(10)

    it.each([10, 9.999, -11])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each([11, 10.0001, 50])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        new LightTypeError({
          message: 'Max Value is 10',
          value: value,
        })
      )
    })
  })
})
