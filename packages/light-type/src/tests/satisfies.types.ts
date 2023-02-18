/* eslint-disable @typescript-eslint/no-explicit-any */

import { lt } from '..'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkTypes() {
  const El = lt.object({ name: lt.string().optional() })
  const Obj = lt.object({
    id: lt.number(),
    items: lt.array(El),
  })

  type ExactInput = { id: number; items: { name?: string }[] }
  type ExtraneousInput = {
    id: number
    items: { id: number; name: string }[]
    other: boolean
  }
  type InvalidInput = { id: number; items: { name: number }[] }
  type InvalidInput2 = { id: number; items: { name?: number }[] }

  Obj.satisfiesInput<ExactInput>()
  Obj.satisfiesInput<ExtraneousInput>()
  Obj.satisfiesInput(null as any as ExactInput)
  Obj.satisfiesInput(null as any as ExtraneousInput)
  // @ts-expect-error Input should not satisfy
  Obj.satisfiesInput<InvalidInput>()
  // @ts-expect-error Input should not satisfy
  Obj.satisfiesInput<InvalidInput2>()
  // @ts-expect-error Input should not satisfy
  Obj.satisfiesInput(null as any as InvalidInput)
  // @ts-expect-error Input should not satisfy
  Obj.satisfiesInput(null as any as InvalidInput2)

  const Literal = lt.literal('foo')
  Literal.satisfiesInput('')
  Literal.satisfiesInput<string>()

  const LiteralOnObj = lt.object({ lit: Literal.optional() })
  LiteralOnObj.satisfiesInput({ lit: 'sdasda' })
  LiteralOnObj.satisfiesInput<{ lit: string }>()
}
