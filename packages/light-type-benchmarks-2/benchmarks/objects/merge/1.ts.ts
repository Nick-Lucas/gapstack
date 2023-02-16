export interface EntityDto {
  id: number
}

export interface PersonDto extends Omit<EntityDto, 'id'> {
  id: string
  firstName: string
  lastName: string
  tel?: string
}

export const brands = ['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const

export interface CarDto extends Omit<EntityDto, 'id'> {
  id: string
  name: string
  age: number
  brand: typeof brands[number]
  previousOwners: PersonDto[]
}
