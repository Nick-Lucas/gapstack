export type PersonDto = {
  id: number
  firstName: string
  lastName: string
  tel?: string
}

export const brands = ['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const

export type CarDto = {
  id: number
  name: string
  age: number
  brand?: typeof brands[number]
  previousOwners: PersonDto
}
