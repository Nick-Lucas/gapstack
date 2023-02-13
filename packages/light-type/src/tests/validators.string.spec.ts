import { lt } from '..'
import { LightTypeError } from '../lib/errors/LightTypeError'

describe('string validators', () => {
  describe('min', () => {
    const t = lt.string().min(1)

    it.each([' ', '0', 'Foo'])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each([''])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        new LightTypeError({
          message: 'Min Length is 1',
          value: value,
        })
      )
    })
  })

  describe('max', () => {
    const t = lt.string().max(3)

    it.each(['Foo', '', '4'])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each(['Fooo', 'FoooooooBaaaarrr'])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        new LightTypeError({
          message: 'Max Length is 3',
          value: value,
        })
      )
    })
  })

  describe('length', () => {
    const t = lt.string().length(3)

    it.each(['Foo', '444'])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each(['Fooo', 'Fo'])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        new LightTypeError({
          message: 'Expected Length is 3',
          value: value,
        })
      )
    })
  })
})
