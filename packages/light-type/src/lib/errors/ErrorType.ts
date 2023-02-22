export type ErrorType =
  | 'required'
  | 'min'
  | 'max'
  | 'length'
  | 'regex'
  | 'includes'
  | 'startsWith'
  | 'endsWith'
  | (string & Record<never, never>)
