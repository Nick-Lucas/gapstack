import path from 'path'
import fs from 'fs'

type Alt = string & Record<never, never>

const root = path.join(__dirname, '../../')
const trace = path.join(root, './.trace/trace.json')
const benchmarkRoot = path
  .join(root, 'packages/light-type-benchmarks-2/benchmarks')
  .toLowerCase()

type TraceItem = {
  name: 'checkSourceFile'
  ph: 'B' | 'E' // not sure what this is really
  ts: number
  args: {
    path: string
  }
}

type OtherTraceItem = { name: Alt; ph: Alt }

const dataa = JSON.parse(fs.readFileSync(trace).toString()) as (
  | TraceItem
  | OtherTraceItem
)[]

const files = dataa.filter((d) => d.name === 'checkSourceFile')

const filesWithTimes = files as (TraceItem & { timeMs: number })[]
for (let i = 0; i < filesWithTimes.length - 1; i++) {
  const f = filesWithTimes[i]
  const fNext = filesWithTimes[i + 1]
  f.timeMs = (fNext.ts - f.ts) / 1000
}

console.log(
  filesWithTimes
    .filter((f) => f.ph === 'B')
    .filter((f) => f.args.path.startsWith(benchmarkRoot))
    .map((f) => {
      return {
        path: f.args.path.replace(benchmarkRoot, ''),
        timeMs: f.timeMs,
      }
    })
)
