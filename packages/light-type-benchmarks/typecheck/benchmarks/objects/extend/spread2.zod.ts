import { z } from 'zod'

export const EntityDtoCore = z.object({
  id: z.number(),
})

export const PersonDto = z.object({
  ...EntityDtoCore.shape,
  firstName: z.string(),
  lastName: z.string(),
  tel: z.string().optional(),
})

export const CarDto = z.object({
  ...EntityDtoCore.shape,
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
