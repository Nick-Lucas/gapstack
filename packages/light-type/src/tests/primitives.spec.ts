import { lt } from '..'

describe('primitives', () => {
  describe('number', () => {
    describe('simple', () => {
      it.each([1, 0, -1])('parses valid input %p', (input) => {
        expect(lt.number().parse(input)).toEqual(input)
      })

      it.each(['1', null, undefined])('rejects invalid input %p', (input) => {
        expect(() => lt.number().parse(input)).toThrowError(Error)
      })
    })

    describe('default', () => {
      const t = lt.number().default(0)

      it.each([null, undefined])('defaults to %p', (input) => {
        expect(t.parse(input)).toEqual(0)
      })

      it.each(['', '0', false, new Date(), new Object(), Symbol()])(
        'rejects invalid input %p',
        (input) => {
          expect(() => t.parse(input)).toThrowError(Error)
        }
      )
    })

    describe('optional', () => {
      const t = lt.number().optional()

      it.each([1, undefined])('parses valid input: %p', (input) => {
        expect(t.parse(input)).toEqual(input)
      })

      it.each([null, '', '1', true, new Date()])(
        'rejects invalid input: %p',
        (input) => {
          expect(() => t.parse(input)).toThrowError(Error)
        }
      )
    })

    describe('nullable', () => {
      const t = lt.number().nullable()

      it.each([1, null])('parses valid input: %p', (input) => {
        expect(t.parse(input)).toEqual(input)
      })

      it.each([undefined, '', '1', true, new Date()])(
        'rejects invalid input: %p',
        (input) => {
          expect(() => t.parse(input)).toThrowError(Error)
        }
      )
    })
  })

  // TODO: string

  // TODO: literal

  // TODO: boolean

  // TODO: date
})
