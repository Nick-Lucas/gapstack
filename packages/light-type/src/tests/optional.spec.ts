import lt from '../lib'
import { aggregated, throws } from './errors'

describe('optional', () => {
  const num = lt.number()

  // eslint-disable-next-line
  function checkTypes() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const any: any = null

    function assert<T extends true>(value: T) {
      return value
    }

    type CanBeUndefined<T> = undefined extends T ? true : false

    // @ts-expect-error should not allow undefined
    assert(any as CanBeUndefined<typeof num['_input']>)
    // @ts-expect-error should not allow undefined
    assert(any as CanBeUndefined<typeof num['_output']>)

    const optional = num.optional()
    assert(any as CanBeUndefined<typeof optional['_input']>)
    assert(any as CanBeUndefined<typeof optional['_output']>)

    const defaulted = num.default(0)
    assert(any as CanBeUndefined<typeof defaulted['_input']>)
    // @ts-expect-error should not allow undefined
    assert(any as CanBeUndefined<typeof defaulted['_output']>)

    const defaultOptional = num.default(0).optional()
    assert(any as CanBeUndefined<typeof defaultOptional['_input']>)
    assert(any as CanBeUndefined<typeof defaultOptional['_output']>)

    const optionalDefault = num.optional().default(0)
    assert(any as CanBeUndefined<typeof optionalDefault['_input']>)
    assert(any as CanBeUndefined<typeof optionalDefault['_output']>)

    const requiredFromOptional = num.optional().required()
    // @ts-expect-error should not allow undefined
    assert(any as CanBeUndefined<typeof requiredFromOptional['_input']>)
    // @ts-expect-error should not allow undefined
    assert(any as CanBeUndefined<typeof requiredFromOptional['_output']>)

    const requiredFromDefault = num.optional().required()
    // @ts-expect-error should not allow undefined
    assert(any as CanBeUndefined<typeof requiredFromDefault['_input']>)
    // @ts-expect-error should not allow undefined
    assert(any as CanBeUndefined<typeof requiredFromDefault['_output']>)
  }

  it('makes a number optional', () => {
    expect(num.optional().parse(undefined)).toEqual(undefined)
  })

  it('makes a number defaulted', () => {
    expect(num.default(0).parse(undefined)).toEqual(0)
  })

  it('makes an optional number defaulted', () => {
    expect(num.optional().default(0).parse(undefined)).toEqual(0)
  })

  it('makes an default number optional', () => {
    expect(num.default(0).optional().parse(undefined)).toEqual(undefined)
  })

  it('makes a non-optional number required', () => {
    expect(num.required().parse(0)).toEqual(0)
  })

  it('makes a optional number required', () => {
    throws(
      () => num.optional().required().parse(undefined),
      aggregated({
        message: 'Not a Number',
        type: 'required',
        value: undefined,
      })
    )
  })

  it('makes a default number required', () => {
    throws(
      () => num.default(1).required().parse(undefined),
      aggregated({
        message: 'Not a Number',
        type: 'required',
        value: undefined,
      })
    )
  })
})
