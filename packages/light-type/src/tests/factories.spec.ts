/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnyLightType, InferInput, LightType, lt } from '..'

describe('factories', () => {
  describe('simple object with primitive types', () => {
    const PageDto = <T extends LightType<unknown, unknown>>(item: T) =>
      lt.object({
        page: lt.number().default(0),
        size: lt.number().default(0),
        content: lt.array(item).default([]),
      })

    const NumberDto = lt.number()
    type NumberType = InferInput<typeof NumberDto>

    const LiteralDto = lt.literal(['Foo', 'Bar'])
    type LiteralType = InferInput<typeof LiteralDto>

    const BusinessObjectDto = lt.object({
      id: lt.number(),
      name: lt.string(),
    })
    type BusinessObjectType = InferInput<typeof BusinessObjectDto>

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function checkTypes() {
      const PagedBusinessObjectDto = PageDto(BusinessObjectDto)
      const PagedNumberDto = PageDto(NumberDto)
      const PagedLiteralDto = PageDto(LiteralDto)

      //
      // Should infer an object type correctly

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const businessObjectIn: BusinessObjectType =
        PagedBusinessObjectDto._input['content']![0]

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const businessObjectOut: BusinessObjectType =
        PagedBusinessObjectDto._output['content']![0]

      //
      // Should infer a number type correctly

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numberIn: NumberType = PagedNumberDto._input['content']![0]

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numberOut: NumberType = PagedNumberDto._output['content']![0]

      //
      // Should infer a number type correctly

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const literalIn: LiteralType = PagedLiteralDto._input['content']![0]

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const literalOut: LiteralType = PagedLiteralDto._output['content']![0]

      //
      // Also check with an array factory

      const ArrayDto = <T extends LightType<unknown, unknown>>(item: T) =>
        lt.array(item)
      const NumberArray = ArrayDto(lt.number())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numArrayIn: number = NumberArray._inputElement

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numArrayOut: number = NumberArray._outputElement

      //
      // Also check straight object factory

      const ObjectDto = <T extends LightType<unknown, unknown>>(item: T) =>
        lt.object({
          id: lt.number(),
          generic: item,
        })
      const NumberObject = ObjectDto(lt.number())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numObjectIn: number = NumberObject._input['generic']

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numObjectOut: number = NumberObject._output['generic']

      //
      // Also check wrapped object factory

      const creator = <T extends AnyLightType>(input: T) =>
        lt.object({ value: input })
      const CreatorObjectDto = <T extends AnyLightType>(item: T) =>
        lt.object({
          id: lt.number(),
          generic: creator(item),
        })
      const CreatorNumberObject = CreatorObjectDto(lt.number())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numCreatorObjectIn: number =
        CreatorNumberObject._input['generic']['value']

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const numCreatorObjectOut: number =
        CreatorNumberObject._output['generic']['value']
    }

    it.each([
      [
        'BusinessObjectDto',
        BusinessObjectDto,
        BusinessObjectDto.check({
          id: 1,
          name: 'Foobar',
        }),
      ],
      ['LiteralDto', LiteralDto, LiteralDto.check('Foo')],
      ['NumberDto', NumberDto, NumberDto.check(1)],
    ])('should parse %s', (name, Dto, obj) => {
      const PagedDto = PageDto(Dto)

      expect(
        PagedDto.parse({
          page: 1,
          size: 1,
          content: [obj],
        })
      ).toEqual({
        page: 1,
        size: 1,
        content: [obj],
      })
    })
  })
})
