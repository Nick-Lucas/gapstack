/* eslint-disable @typescript-eslint/no-unused-vars */

import { InferInput, lt } from '..'

function checkTypes() {
  //
  // Optional should not be required

  const optionalVal = lt.object({
    val: lt.number().optional(),
  })
  type OptionalVal = InferInput<typeof optionalVal>

  // val should be totally optional, not just undefined
  const optionalExample: OptionalVal = {}

  // val should accept valid value
  const optionalExample2: OptionalVal = {
    val: 1,
  }

  //
  // Default should allow undefined

  const defaultVal = lt.object({
    val: lt.number().default(0),
  })

  type DefaultVal = InferInput<typeof defaultVal>

  // val should be totally optional, not just undefined
  const defaultExample: DefaultVal = {}

  const defaultExample2: DefaultVal = {
    // @ts-expect-error val should not accept null
    val: null,
  }

  // val should also accept undefined
  const defaultExample3: DefaultVal = {
    val: undefined,
  }

  // val should accept valid value
  const defaultExample4: DefaultVal = {
    val: 1,
  }

  //
  // defaultNull should allow null

  const defaultNullVal = lt.object({
    val: lt.number().defaultNull(0),
  })
  type DefaultNullVal = InferInput<typeof defaultNullVal>

  // @ts-expect-error empty object is not allowed
  const defaultNullExample: DefaultNullVal = {}

  const defaultNullExample2: DefaultNullVal = {
    val: null,
  }

  // val should not accept undefined
  const defaultNullExample3: DefaultNullVal = {
    // @ts-expect-error undefined not allowed
    val: undefined,
  }

  // val should accept valid value
  const defaultNullExample4: DefaultNullVal = {
    val: 1,
  }

  //
  // Nullable should be required but nullable

  const nullableVal = lt.object({
    val: lt.number().nullable(),
  })
  type NullableVal = InferInput<typeof nullableVal>

  // @ts-expect-error val should be nullable, but required
  const nullableExample: NullableVal = {}

  // val should also accept null
  const nullableExample2: NullableVal = {
    val: null,
  }

  const nullableExample3: NullableVal = {
    // @ts-expect-error val should not accept undefined
    val: undefined,
  }

  // val should accept valid value
  const nullableExample4: NullableVal = {
    val: 1,
  }
}
