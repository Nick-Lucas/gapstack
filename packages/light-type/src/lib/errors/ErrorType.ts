export type ErrorType =
  | 'required'
  | 'strict'
  | 'min'
  | 'max'
  | 'length'
  | 'regex'
  | 'includes'
  | 'startsWith'
  | 'endsWith'
  | (string & Record<never, never>)
