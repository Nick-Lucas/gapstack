import { z } from 'zod'

export const EntityDto = z.object({
  id: z.number(),
})

export const PersonDto = EntityDto.merge(
  z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    tel: z.string().optional(),
  })
)

export const CarDto = EntityDto.merge(
  z.object({
    id: z.string(),
    name: z.string(),
    age: z.number(),
    brand: z
      .union([
        z.literal('Volvo'),
        z.literal('Mercedes'),
        z.literal('BMW'),
        z.literal('Ferrari'),
        z.literal('Bazmus'),
      ])
      .optional(),
    previousOwners: z.array(PersonDto).default([]),
  })
)
