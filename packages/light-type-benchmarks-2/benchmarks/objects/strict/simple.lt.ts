import { lt } from 'dist-lt'

export const CarDto = lt
  .object({
    id: lt.number(),
    name: lt.string(),
    age: lt.number(),
    brand: lt.string(),
    isScrapped: lt.boolean(),
    previousOwners: lt.array(lt.any()).default([]),
  })
  .strict()
