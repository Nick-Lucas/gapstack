import { lt } from '../../../dist/packages/light-type/src'

export const PersonDto = lt.object({
  id: lt.number(),
  firstName: lt.string(),
  lastName: lt.string(),
  tel: lt.string().optional(),
})

export const CarDto = lt.object({
  id: lt.number(),
  name: lt.string(),
  age: lt.number(),
  brand: lt
    .literal(['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const)
    .optional(),
  previousOwners: lt.array(PersonDto).default([]),
})
