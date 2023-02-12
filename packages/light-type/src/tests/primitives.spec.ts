/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'
import { ChainableType } from '../lib/chainable/ChainableType'
import { LightTypeError } from '../lib/errors/LightTypeError'

describe('primitives', () => {
  type ProceduralTest = [
    name: string,
    type: ChainableType<any>,
    validInputs: unknown[],
    invalidInputs: unknown[],
    error: string
  ]

  describe.each<ProceduralTest>([
    [
      'Number',
      lt.number(),
      [1, 0, -1],
      ['', '1', true, new Date()],
      'Not a Number',
    ],
    [
      'String',
      lt.string(),
      ['foo', ''],
      [0, 1, true, new Date()],
      'Not a String',
    ],
    [
      'Boolean',
      lt.boolean(),
      [false, true],
      ['', 'true', 0, 1, new Date()],
      'Not a Boolean',
    ],
    [
      'Date',
      lt.date(),
      [new Date()],
      ['', 'true', 0, 1, true, false, new Date().toISOString()],
      'Not a Date',
    ],
    [
      'Literal',
      lt.literal(['foo', 'bar', 1] as const),
      ['foo', 'bar', 1],
      ['', 'true', 0, true, false, new Date()],
      'Does not match literal, expected one of foo, bar, 1',
    ],
  ])('%s', (name, type, validInputs, invalidInputs, error) => {
    describe('simple', () => {
      it.each(validInputs)('parses valid input %p', (input: any) => {
        expect(type.parse(input)).toEqual(input)
      })

      it.each(invalidInputs)('rejects invalid input %p', (input: any) => {
        expect(() => type.parse(input)).toThrowError(
          new LightTypeError({
            message: error,
            value: input,
          })
        )
      })
    })

    describe('default', () => {
      const t = type.default(0)

      it.each([null, undefined])('defaults to %p', (input: any) => {
        expect(t.parse(input)).toEqual(0)
      })

      it.each(invalidInputs)('rejects invalid input %p', (input: any) => {
        expect(() => t.parse(input)).toThrowError(
          new LightTypeError({
            message: error,
            value: input,
          })
        )
      })
    })

    describe('optional', () => {
      const t = type.optional()

      it.each([...validInputs, undefined])(
        'parses valid input: %p',
        (input: any) => {
          expect(t.parse(input)).toEqual(input)
        }
      )

      it.each([invalidInputs])('rejects invalid input: %p', (input: any) => {
        expect(() => t.parse(input)).toThrowError(
          new LightTypeError({
            message: error,
            value: input,
          })
        )
      })
    })

    describe('nullable', () => {
      const t = type.nullable()

      it.each([...validInputs, null])(
        'parses valid input: %p',
        (input: any) => {
          expect(t.parse(input)).toEqual(input)
        }
      )

      it.each(invalidInputs)('rejects invalid input: %p', (input: any) => {
        expect(() => t.parse(input)).toThrowError(
          new LightTypeError({
            message: error,
            value: input,
          })
        )
      })
    })
  })
})
