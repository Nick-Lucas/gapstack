import lt from '../lib'
import { aggregated, throws } from './errors'

describe('nullable', () => {
  const num = lt.number()

  // eslint-disable-next-line
  function checkTypes() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const any: any = null

    function assert<T extends true>(value: T) {
      return value
    }

    type CanBeNull<T> = null extends T ? true : false

    // @ts-expect-error should not allow null
    assert(any as CanBeNull<typeof num['_input']>)
    // @ts-expect-error should not allow null
    assert(any as CanBeNull<typeof num['_output']>)

    const nullable = num.nullable()
    assert(any as CanBeNull<typeof nullable['_input']>)
    assert(any as CanBeNull<typeof nullable['_output']>)

    const defaultNulled = num.defaultNull(0)
    assert(any as CanBeNull<typeof defaultNulled['_input']>)
    // @ts-expect-error should not allow null
    assert(any as CanBeNull<typeof defaultNulled['_output']>)

    const defaultNullOptional = num.defaultNull(0).nullable()
    assert(any as CanBeNull<typeof defaultNullOptional['_input']>)
    assert(any as CanBeNull<typeof defaultNullOptional['_output']>)

    const nullableDefault = num.nullable().defaultNull(0)
    assert(any as CanBeNull<typeof nullableDefault['_input']>)
    // @ts-expect-error should not allow null
    assert(any as CanBeNull<typeof nullableDefault['_output']>)
  }

  it('makes a number nullable', () => {
    expect(num.nullable().parse(null)).toEqual(null)
  })

  it('makes a number defaultNulled', () => {
    expect(num.defaultNull(0).parse(null)).toEqual(0)
  })

  it('makes an nullable number defaultNulled', () => {
    expect(num.nullable().defaultNull(0).parse(null)).toEqual(0)
  })

  it('makes an defaultNull number nullable', () => {
    expect(num.defaultNull(0).nullable().parse(null)).toEqual(null)
  })
})
