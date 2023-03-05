import lt from '../lib'

describe('casting', () => {
  describe('arrays', () => {
    const array = lt.array(
      lt.object({
        id: lt.number(),
        name: lt.string(),
      })
    )

    it('asSet', () => {
      const asSet = array.asSet()

      expect(
        asSet.check([
          {
            id: 1,
            name: 'foo',
          },
          {
            id: 2,
            name: 'bar',
          },
        ])
      ).toEqual(
        new Set([
          {
            id: 1,
            name: 'foo',
          },
          {
            id: 2,
            name: 'bar',
          },
        ])
      )
    })

    it('asSet when optional', () => {
      const asSet = array.asSet().optional()

      expect(asSet.check(undefined)).toEqual(undefined)

      expect(
        asSet.check([
          {
            id: 1,
            name: 'foo',
          },
          {
            id: 2,
            name: 'bar',
          },
        ])
      ).toEqual(
        new Set([
          {
            id: 1,
            name: 'foo',
          },
          {
            id: 2,
            name: 'bar',
          },
        ])
      )
    })
  })
})
