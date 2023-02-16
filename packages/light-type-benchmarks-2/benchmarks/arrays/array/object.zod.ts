import { z } from 'zod'

export const Numbers = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    age: z.number().optional(),
    isEmployed: z.boolean(),
  })
)
