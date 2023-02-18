type num = number | undefined

// prior to typescript 4.9
function testSatisfies<T, U extends T>() {
  return null as T as U
}

testSatisfies<num, number>()
testSatisfies<num, undefined>()
testSatisfies<number, number>()
