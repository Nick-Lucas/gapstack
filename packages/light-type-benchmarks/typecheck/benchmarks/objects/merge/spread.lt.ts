/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lt } from 'dist-lt'

export const EntityDto = {
  id: lt.number(),
}

export const PersonDto = lt.object({
  // @ts-ignore
  id: lt.string(),
  firstName: lt.string(),
  lastName: lt.string(),
  tel: lt.string().optional(),
  ...EntityDto,
})

export const CarDto = lt.object({
  // @ts-ignore
  id: lt.string(),
  name: lt.string(),
  age: lt.number(),
  brand: lt
    .literal(['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const)
    .optional(),
  previousOwners: lt.array(PersonDto).default([]),
  ...EntityDto,
})
