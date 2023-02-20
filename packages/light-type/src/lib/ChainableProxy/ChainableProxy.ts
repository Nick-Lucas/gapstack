/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Simplify } from '../types/utils'
import { Assertion, numbers, strings } from '../validators'
import {
  CommonExtensions,
  AddExtensions,
  Key,
  AllExtensionKeys,
} from './Extensions'
import { TypeInner, AnyInner, inner } from './TypeInner'

//
// Proxy
//

const getOptional = <A, B>(
  t: TypeInner<A, B>
): CommonExtensions<unknown, unknown>['optional'] => {
  return () =>
    Next(
      inner<A | undefined, B | undefined>({
        type: t.type,
        parse(input, ctx) {
          if (input === undefined) {
            return undefined
          }
          return t.parse(input, ctx)
        },
      })
    )
}

const getDefault = <A, B>(
  t: TypeInner<A, B>
): CommonExtensions<unknown, unknown>['default'] => {
  return (defaultValue: B) =>
    Next(
      inner<A | undefined, B>({
        type: t.type,
        parse(input, ctx) {
          if (input === undefined) {
            return defaultValue
          }
          return t.parse(input, ctx)
        },
      })
    )
}

const getNullable = <A, B>(
  t: TypeInner<A, B>
): CommonExtensions<unknown, unknown>['nullable'] => {
  return () =>
    Next(
      inner<A | null, B | null>({
        type: t.type,
        parse(input, ctx) {
          if (input === null) {
            return null
          }
          return t.parse(input, ctx)
        },
      })
    )
}

const getDefaultNull = <A, B>(
  t: TypeInner<A, B>
): CommonExtensions<unknown, unknown>['defaultNull'] => {
  return (defaultValue: B) =>
    Next(
      inner<A | null, B>({
        type: t.type,
        parse(input, ctx) {
          if (input === null) {
            return defaultValue
          }
          return t.parse(input, ctx)
        },
      })
    )
}

const getMin = <A, B>(
  t: TypeInner<A, B>
): CommonExtensions<unknown, unknown>['defaultNull'] => {
  switch (t.type) {
    case 'number': {
      return (minValue: number) =>
        Next(
          inner<A | null, B>({
            type: t.type,
            parse(input, ctx) {
              if (input === null) {
                return defaultValue
              }
              return t.parse(input, ctx)
            },
          })
        )
    }
    default: {
      console.error('Cannot be invoked for', t.type)
    }
  }
}

function Next<T extends AnyInner>(t: T) {
  const target = t as unknown as AddExtensions<T>

  return new Proxy(target, {
    get(target, _p, receiver) {
      const p = _p as AllExtensionKeys

      switch (p) {
        case '_input':
        case '_output': {
          // These don't really matter, they're for inference only
          return null
        }
        //
        // Parsing
        //
        case 'check':
        case 'parse': {
          return (input: unknown) =>
            t.parse(input, {
              // TODO: context
            })
        }
        //
        // Common
        //
        case 'optional': {
          return getOptional(t)
        }
        case 'default': {
          return getDefault(t)
        }
        case 'nullable': {
          return getNullable(t)
        }
        case 'defaultNull': {
          return getDefaultNull(t)
        }
        case 'pipe': {
          // TODO: implement piping
          return null
        }
        case 'min': {
          // TODO:
          return null
        }
        case 'max': {
          // TODO:
          return null
        }
        case 'length': {
          // TODO:
          return null
        }
        case 'includes': {
          // TODO:
          return null
        }
        case 'regex': {
          // TODO:
          return null
        }
        default: {
          exhaustive(p)
          return Reflect.get(target, _p, receiver)
        }
      }
    },
  })
}

function exhaustive(x: never): void {
  console.error('Unhandled case: ' + x)
}

//
// lt
//

function number() {
  return Next<TypeInner<number, number>>({
    _input: null!,
    _output: null!,
    type: 'number',
    parse(input: number, context) {
      return input as number
    },
  })
}

function string() {
  return Next<TypeInner<string, string>>({
    _input: null!,
    _output: null!,
    type: 'string',
    parse(input: string, context) {
      return input as string
    },
  })
}
