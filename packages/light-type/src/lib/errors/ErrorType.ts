export type ErrorType =
  | 'required'
  | 'min'
  | 'max'
  | 'length'
  | 'regex'
  | 'includes'
  | '${any-string}'
  | (string & Record<never, never>)
