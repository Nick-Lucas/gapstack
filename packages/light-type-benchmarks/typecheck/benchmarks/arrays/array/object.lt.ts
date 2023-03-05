import { lt } from 'dist-lt'

export const Numbers = lt.array(
  lt.object({
    id: lt.number(),
    name: lt.string(),
    age: lt.number().optional(),
    isEmployed: lt.boolean(),
  })
)
