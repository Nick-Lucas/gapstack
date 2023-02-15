import { z } from 'zod'

export const EntityDto = z.object({
  id: z.number(),
})

export const PersonDto = EntityDto.extend({
  firstName: z.string(),
  lastName: z.string(),
  tel: z.string().optional(),
})

export const CarDto = EntityDto.extend({
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

export type DbCar = typeof CarDto['_input']
export type Brand = typeof CarDto['_output']['brand']
