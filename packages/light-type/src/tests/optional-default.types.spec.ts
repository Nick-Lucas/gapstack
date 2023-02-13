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
  const optional: OptionalVal = {}

  //
  // Optional should not be required

  const defaultVal = lt.object({
    val: lt.number().default(0),
  })
  type DefaultVal = InferInput<typeof defaultVal>

  // val should be totally optional, not just undefined
  const defaultExample: OptionalVal = {}

  //
  // Nullable should be required but nullable

  const nullableVal = lt.object({
    val: lt.number().nullable(),
  })
  type NullableVal = InferInput<typeof nullableVal>

  // @ts-expect-error val should be nullable, but required
  const nullable: OptionalVal = {}
}
