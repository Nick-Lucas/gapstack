import { lt } from '../../../dist/packages/light-type/src'

export const CarDto = lt.object({
  id: lt.number(),
  name: lt.string(),
  age: lt.number(),
  brand: lt.string(),
  isScrapped: lt.boolean(),
  previousOwners: lt.array(lt.any()).default([]),
})
