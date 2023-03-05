import { lt } from 'dist-lt'

const num = lt.number().default(0)

num.satisfiesInput(1)
num.satisfiesInput(undefined)
