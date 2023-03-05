export type EntityDto = {
  id: number
}

export type PersonDto = EntityDto & {
  firstName: string
  lastName: string
  tel?: string
}

export const brands = ['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const

export type CarDto = EntityDto & {
  name: string
  age: number
  brand: typeof brands[number]
  previousOwners: PersonDto[]
}
