export interface EntityDto {
  id: number
}

export interface PersonDto extends EntityDto {
  firstName: string
  lastName: string
  tel?: string
}

export const brands = ['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const

export interface CarDto extends EntityDto {
  name: string
  age: number
  brand: typeof brands[number]
  previousOwners: PersonDto[]
}
