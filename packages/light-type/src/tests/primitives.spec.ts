/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'
import { LightTypeError } from '../lib/errors/LightTypeError'

describe('primitives', () => {
  describe('number', () => {
    describe('simple', () => {
      const t = lt.number()

      it.each([1, 0, -1])('parses valid input %p', (input: any) => {
        expect(t.parse(input)).toEqual(input)
      })

      it.each(['1', null, undefined])(
        'rejects invalid input %p',
        (input: any) => {
          expect(() => t.parse(input)).toThrowError(
            new LightTypeError({
              message: 'Not a Number',
              value: input,
            })
          )
        }
      )
    })

    describe('default', () => {
      const t = lt.number().default(0)

      it.each([null, undefined])('defaults to %p', (input: any) => {
        expect(t.parse(input)).toEqual(0)
      })

      it.each(['', '0', false, new Date(), new Object(), Symbol()])(
        'rejects invalid input %p',
        (input: any) => {
          expect(() => t.parse(input)).toThrowError(
            new LightTypeError({
              message: 'Not a Number',
              value: input,
            })
          )
        }
      )
    })

    describe('optional', () => {
      const t = lt.number().optional()

      it.each([1, undefined])('parses valid input: %p', (input: any) => {
        expect(t.parse(input)).toEqual(input)
      })

      it.each([null, '', '1', true, new Date()])(
        'rejects invalid input: %p',
        (input: any) => {
          expect(() => t.parse(input)).toThrowError(
            new LightTypeError({
              message: 'Not a Number',
              value: input,
            })
          )
        }
      )
    })

    describe('nullable', () => {
      const t = lt.number().nullable()

      it.each([1, null])('parses valid input: %p', (input: any) => {
        expect(t.parse(input)).toEqual(input)
      })

      it.each([undefined, '', '1', true, new Date()])(
        'rejects invalid input: %p',
        (input: any) => {
          expect(() => t.parse(input)).toThrowError(
            new LightTypeError({
              message: 'Not a Number',
              value: input,
            })
          )
        }
      )
    })
  })

  // TODO: string

  // TODO: literal

  // TODO: boolean

  // TODO: date
})
