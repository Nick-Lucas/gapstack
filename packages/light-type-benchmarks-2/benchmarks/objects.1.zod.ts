import { z } from 'zod'

export const CarDto = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  brand: z.string(),
  isScrapped: z.boolean(),
  previousOwners: z.array(z.any()).default([]),
})
