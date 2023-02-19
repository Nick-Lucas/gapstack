import { lt, strings } from '..'
import { LightTypeError } from '../lib/errors/LightTypeError'
import { aggregated } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  lt.string().pipe(strings.max(1))
  lt.string().pipe(strings.max(10), strings.min(1))
}

describe('string validators', () => {
  describe('min', () => {
    const t = lt.string().pipe(strings.min(1))

    it.each([' ', 'Foo'])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each([''])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated(
          new LightTypeError({
            message: 'Min Length is 1',
            value: value,
          })
        )
      )
    })
  })

  describe('max', () => {
    const t = lt.string().pipe(strings.max(10))

    it.each(['FooBarBaz2', ''])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each(['FooBarBaz21'])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated(
          new LightTypeError({
            message: 'Max Length is 10',
            value: value,
          })
        )
      )
    })
  })

  describe('length', () => {
    const t = lt.string().pipe(strings.length(10))

    it.each(['FooBarBaz2', '          '])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each(['', 'FooBarBaz', 'FooBarBaz21'])('throws', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated(
          new LightTypeError({
            message: 'Expected Length is 10',
            value: value,
          })
        )
      )
    })
  })

  describe('chaining', () => {
    const t = lt.string().pipe(strings.min(1), strings.max(10))

    it.each(['FooBarBaz2', ' '])('validates successfully', (value) => {
      expect(t.parse(value)).toBe(value)
    })

    it.each(['FooBarBaz21'])('throws over max', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated(
          new LightTypeError({
            message: 'Max Length is 10',
            value: value,
          })
        )
      )
    })

    it.each([''])('throws under min', (value) => {
      expect(() => t.parse(value)).toThrow(
        aggregated(
          new LightTypeError({
            message: 'Min Length is 1',
            value: value,
          })
        )
      )
    })
  })
})
