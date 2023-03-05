import { lt } from 'dist-lt'

export const EntityDto = lt.object({
  id: lt.number(),
})

export const PersonDto = lt.object({
  ...EntityDto.shape,
  id: lt.string(),
  firstName: lt.string(),
  lastName: lt.string(),
  tel: lt.string().optional(),
})

export const CarDto = lt.object({
  ...EntityDto.shape,
  id: lt.string(),
  name: lt.string(),
  age: lt.number(),
  brand: lt
    .literal(['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const)
    .optional(),
  previousOwners: lt.array(PersonDto).default([]),
})
