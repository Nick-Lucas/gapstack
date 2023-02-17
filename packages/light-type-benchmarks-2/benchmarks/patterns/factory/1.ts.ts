/* eslint-disable @typescript-eslint/no-empty-interface */

export interface PageDto<T> {
  page: number
  size: number
  content: T[]
}

export interface BusinessObjectDto {
  id: number
  name: string
}

export interface PagedBusinessObjectDto extends PageDto<BusinessObjectDto> {}
