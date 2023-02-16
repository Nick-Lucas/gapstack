export type EntityDto = {
  id: number
}

export type PersonDto = Omit<EntityDto, 'id'> & {
  id: string
  firstName: string
  lastName: string
  tel?: string
}

export const brands = ['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const

export type CarDto = Omit<EntityDto, 'id'> & {
  id: string
  name: string
  age: number
  brand: typeof brands[number]
  previousOwners: PersonDto[]
}
