import lt from '../lib'

describe('inner types of collection types', () => {
  describe('object', () => {
    const obj = lt.object({
      id: lt.number(),
      name: lt.string(),
    })

    it('parses an id', () => {
      expect(obj.shape.id.parse(1)).toBe(1)
    })

    it('parses an name', () => {
      expect(obj.shape.name.parse('foo')).toBe('foo')
    })
  })

  describe('array', () => {
    const array = lt.array(
      lt.object({
        id: lt.number(),
        name: lt.string(),
      })
    )

    it('parses an object', () => {
      expect(array.element.check({ id: 1, name: 'foo' })).toEqual({
        id: 1,
        name: 'foo',
      })
    })
  })
})
