import { ErrorType } from '../errors/ErrorType'

export interface Issue {
  type: ErrorType
  message: string
  value: unknown
  path?: string
}
