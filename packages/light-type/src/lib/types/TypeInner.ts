import { InternalContext } from '../context/Context'

export type DataType =
  | 'object'
  | 'array'
  | 'any'
  | 'unknown'
  | 'boolean'
  | 'number'
  | 'string'
  | 'date'
  | 'literal'
  | 'record'
  | 'map'
  | 'tuple'
  | 'union'
  | 'set'
  | 'none'

export interface TypeInner<TInput, TOutput = TInput> {
  type: DataType
  parse(input: unknown, context: InternalContext): TOutput
}
