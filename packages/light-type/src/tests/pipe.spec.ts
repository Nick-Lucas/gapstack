/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  lt.number().pipe((a) => String(a))
  lt.number().pipe(
    String,
    (s) => parseInt(s),
    (n) => new Date(n)
  )
  lt.number().pipe(
    (a) => String(a),
    (s) => new Date(s)
  )

  lt.number().pipe(
    (num) => [num],
    // @ts-expect-error should be statically typed
    (notNum) => notNum + 1
  )

  lt.string().pipe((s) => (s ? 'bar' : undefined), lt.literal('foo').optional())
}

describe('pipe', () => {
  it('Works with all input counts', () => {
    const t = lt.number()

    expect(t.pipe(String).parse(12)).toBe('12')
    expect(t.pipe(Number, String).parse(12)).toBe('12')
    expect(t.pipe(Number, Number, String).parse(12)).toBe('12')
    expect(t.pipe(Number, Number, Number, String).parse(12)).toBe('12')
    expect(t.pipe(Number, Number, Number, Number, String).parse(12)).toBe('12')
    expect(
      t.pipe(Number, Number, Number, Number, Number, String).parse(12)
    ).toBe('12')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function limit() {
      expect(
        // @ts-expect-error should have max number of arguments
        t.pipe(Number, Number, Number, Number, Number, Number, String).parse(12)
      ).toBe('12')
    }
  })

  it('works for a mix of function and type inputs', () => {
    const t = lt.string().pipe(
      (s) => new Date(s),
      lt.date(),
      (d) => d.toISOString()
    )

    const dateString = new Date().toISOString()
    expect(t.parse(dateString)).toEqual(dateString)
  })
})
