import { lt } from 'dist-lt'

export const EntityDto = lt.object({
  id: lt.number(),
})

export const PersonDto = EntityDto.extend({
  firstName: lt.string(),
  lastName: lt.string(),
  tel: lt.string().optional(),
})

export const CarDto = EntityDto.extend({
  name: lt.string(),
  age: lt.number(),
  brand: lt
    .literal(['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const)
    .optional(),
  previousOwners: lt.array(PersonDto).default([]),
})
