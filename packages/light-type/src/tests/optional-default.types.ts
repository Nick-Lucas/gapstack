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
  // Optional should not be required

  const defaultVal = lt.object({
    val: lt.number().default(0),
  })
  type DefaultVal = InferInput<typeof defaultVal>

  // val should be totally optional, not just undefined
  const defaultExample: DefaultVal = {}

  // val should also accept null
  const defaultExample2: DefaultVal = {
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
