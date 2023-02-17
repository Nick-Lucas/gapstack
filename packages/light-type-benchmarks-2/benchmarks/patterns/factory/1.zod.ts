import { z, ZodType } from 'zod'

export const PageDto = <T extends ZodType>(item: T) =>
  z.object({
    page: z.number(),
    size: z.number(),
    content: z.array(item),
  })

export const BusinessObjectDto = z.object({
  id: z.number(),
  name: z.string(),
})

export const PagedBusinessObjectDto = PageDto(BusinessObjectDto)
