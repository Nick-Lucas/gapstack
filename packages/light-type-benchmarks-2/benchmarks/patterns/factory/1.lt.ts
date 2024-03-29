import { lt, LtType } from 'dist-lt'

export const PageDto = <T extends LtType>(item: T) =>
  lt.object({
    page: lt.number(),
    size: lt.number(),
    content: lt.array(item),
  })

export const BusinessObjectDto = lt.object({
  id: lt.number(),
  name: lt.string(),
})

export const PagedBusinessObjectDto = PageDto(BusinessObjectDto)
