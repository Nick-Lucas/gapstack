import { z } from 'zod'

const num = z.number().default(0)

// prior to typescript 4.9
function testSatisfies<T, U extends T>() {
  return null as T as U
}

testSatisfies<typeof num['_input'], number>()
testSatisfies<typeof num['_input'], undefined>()
