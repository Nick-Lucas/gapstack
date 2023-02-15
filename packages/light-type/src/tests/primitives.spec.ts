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

  const tests: ProceduralTest[] = [
    [
      'Any',
      lt.any(),
      [1, '', '1', true, new Date(), {}, [], new Set(), new Map()],
      [],
      '',
    ],
    [
      'Unknown',
      lt.unknown(),
      [1, '', '1', true, new Date(), {}, [], new Set(), new Map()],
      [],
      '',
    ],
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
      'Literal Union',
      lt.literal(['foo', 'bar', 1, true]),
      ['foo', 'bar', 1, true],
      ['', '1', 'false', 'true', 0, false, new Date()],
      'Does not match literal, expected one of: foo, bar, 1, true',
    ],
    [
      'Literal String',
      lt.literal('foo'),
      ['foo'],
      ['', 'bar', 0, true, new Date()],
      'Does not match literal, expected one of: foo',
    ],
    [
      'Literal Number',
      lt.literal(1),
      [1],
      ['1', '', 'bar', 0, true, new Date()],
      'Does not match literal, expected one of: 1',
    ],
    [
      'Literal Boolean',
      lt.literal(true),
      [true],
      ['true', '', 'bar', 1, 0, false, new Date()],
      'Does not match literal, expected one of: true',
    ],
  ]

  describe.each<ProceduralTest>(tests)(
    '%s',
    (name, type, validInputs, invalidInputs, error) => {
      describe('simple', () => {
        it.each(validInputs)('parses valid input %p', (input: any) => {
          expect(type.parse(input)).toEqual(input)
        })

        if (invalidInputs.length > 0)
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

        if (invalidInputs.length > 0)
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

        if (invalidInputs.length > 0)
          it.each(invalidInputs)('rejects invalid input: %p', (input: any) => {
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

        if (invalidInputs.length > 0)
          it.each(invalidInputs)('rejects invalid input: %p', (input: any) => {
            expect(() => t.parse(input)).toThrowError(
              new LightTypeError({
                message: error,
                value: input,
              })
            )
          })
      })
    }
  )
})
