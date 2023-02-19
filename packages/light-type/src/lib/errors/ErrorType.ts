export type ErrorType =
  | 'required'
  | 'invalid_type'
  | '${any-string}'
  | (string & Record<never, never>)
