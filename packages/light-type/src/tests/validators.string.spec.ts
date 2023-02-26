import { lt } from '..'
import { strings } from '../lib/validators'

import { aggregated, throws } from './errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  lt.string().pipe(strings.max(1))
  lt.string().pipe(strings.max(10), strings.min(1))
}

describe('chainable validators', () => {
  const Str = lt.string()

  it.each(['1', '22'])('checks min %p', (val) => {
    expect(Str.min(1).check(val)).toEqual(val)
  })

  it.each([''])('checks min rejects %p', (val) => {
    throws(
      () => Str.min(1).check(val),
      aggregated({
        message: 'Min Length is 1',
        type: 'min',
        value: val,
      })
    )
  })

  it.each(['1', '22'])('checks max %p', (val) => {
    expect(Str.max(2).check(val)).toEqual(val)
  })

  it.each(['22'])('checks max rejects %p', (val) => {
    throws(
      () => Str.max(1).check(val),
      aggregated({
        message: 'Max Length is 1',
        type: 'max',
        value: val,
      })
    )
  })

  it.each(['22'])('checks length %p', (val) => {
    expect(Str.length(2).check(val)).toEqual(val)
  })

  it.each(['22'])('checks length rejects %p', (val) => {
    throws(
      () => Str.length(1).check(val),
      aggregated({
        message: 'Expected Length is 1',
        type: 'length',
        value: val,
      })
    )
  })

  it.each(['bar', 'foo'])('checks includes %p', (val) => {
    expect(Str.includes(val).check('foo bar baz')).toEqual('foo bar baz')
  })

  it.each(['22'])('checks includes rejects %p', (val) => {
    throws(
      () => Str.includes(val).check('foo bar baz'),
      aggregated({
        message: 'Expected string to include: 22',
        type: 'includes',
        value: 'foo bar baz',
      })
    )
  })

  it.each(['foo'])('checks startsWith %p', (val) => {
    expect(Str.startsWith(val).check('foo bar baz')).toEqual('foo bar baz')
  })

  it.each(['bar', 'baz'])('checks startsWith rejects %p', (val) => {
    throws(
      () => Str.startsWith(val).check('foo bar baz'),
      aggregated({
        message: 'Expected string to start with: ' + val,
        type: 'startsWith',
        value: 'foo bar baz',
      })
    )
  })

  it.each(['baz'])('checks endsWith %p', (val) => {
    expect(Str.endsWith(val).check('foo bar baz')).toEqual('foo bar baz')
  })

  it.each(['bar', 'fo'])('checks endsWith rejects %p', (val) => {
    throws(
      () => Str.endsWith(val).check('foo bar baz'),
      aggregated({
        message: 'Expected string to end with: ' + val,
        type: 'endsWith',
        value: 'foo bar baz',
      })
    )
  })

  it.each([/bar/, /foo/])('checks regex %p', (val) => {
    expect(Str.regex(val).check('foo bar baz')).toEqual('foo bar baz')
  })

  it.each([/22/])('checks includes rejects %p', (val) => {
    throws(
      () => Str.regex(val).check('foo bar baz'),
      aggregated({
        message: 'Expected string to match: ' + String(val),
        type: 'regex',
        value: 'foo bar baz',
      })
    )
  })
})

describe('string validators', () => {
  describe('min', () => {
    const tSubject = lt.string().pipe(strings.min(1))

    it.each([' ', 'Foo'])('validates successfully', (value) => {
      expect(tSubject.parse(value)).toBe(value)
    })

    it.each([''])('throws', (value) => {
      expect(() => tSubject.parse(value)).toThrow(
        aggregated({
          type: 'min',
          message: 'Min Length is 1',
          value: value,
        })
      )
    })
  })

  describe('max', () => {
    const tSubject = lt.string().pipe(strings.max(10))

    it.each(['FooBarBaz2', ''])('validates successfully', (value) => {
      expect(tSubject.parse(value)).toBe(value)
    })

    it.each(['FooBarBaz21'])('throws', (value) => {
      expect(() => tSubject.parse(value)).toThrow(
        aggregated({
          type: 'max',
          message: 'Max Length is 10',
          value: value,
        })
      )
    })
  })

  describe('length', () => {
    const tSubject = lt.string().pipe(strings.length(10))

    it.each(['FooBarBaz2', '          '])('validates successfully', (value) => {
      expect(tSubject.parse(value)).toBe(value)
    })

    it.each(['', 'FooBarBaz', 'FooBarBaz21'])('throws', (value) => {
      expect(() => tSubject.parse(value)).toThrow(
        aggregated({
          type: 'length',
          message: 'Expected Length is 10',
          value: value,
        })
      )
    })
  })

  describe('chaining', () => {
    const tSubject = lt.string().pipe(strings.min(1), strings.max(10))

    it.each(['FooBarBaz2', ' '])('validates successfully', (value) => {
      expect(tSubject.parse(value)).toBe(value)
    })

    it.each(['FooBarBaz21'])('throws over max', (value) => {
      expect(() => tSubject.parse(value)).toThrow(
        aggregated({
          type: 'max',
          message: 'Max Length is 10',
          value: value,
        })
      )
    })

    it.each([''])('throws under min', (value) => {
      expect(() => tSubject.parse(value)).toThrow(
        aggregated({
          type: 'min',
          message: 'Min Length is 1',
          value: value,
        })
      )
    })
  })
})
