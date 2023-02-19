export type ErrorType =
  | 'required'
  | 'min'
  | 'max'
  | 'length'
  | '${any-string}'
  | (string & Record<never, never>)
