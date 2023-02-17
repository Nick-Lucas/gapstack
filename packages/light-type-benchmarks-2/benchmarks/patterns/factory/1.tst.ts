export type PageDto<T> = {
  page: number
  size: number
  content: T[]
}

export type BusinessObjectDto = {
  id: number
  name: string
}

export type PagedBusinessObjectDto = PageDto<BusinessObjectDto>
