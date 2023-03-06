import path from 'path'
import { parseArgs } from 'util'
import { Framework, FrameworkLabel } from './types'
import { BASELINE_FILENAME, listBenchmarks } from './listBenchmarks'
import { typecheck, assertNoErrors } from './typecheck'
import { minimatch } from 'minimatch'

//
// Inputs
//

const args = parseArgs({
  options: {
    // Will match using https://github.com/isaacs/minimatch (supports simple globbing syntax)
    name: {
      type: 'string',
      multiple: true,
    },
  },
})
const selectedTestNames = args.values.name

console.log('Running tests matching names:', selectedTestNames ?? '{any}')

//
// Benchmarking
//

function benchmarkCompiles() {
  const collections = listBenchmarks()

  const samplesPer = 6

  //
  // Calculate a baseline time
  // The time which typescript takes to load a file and setup
  //

  // const baselineFile = path.join(__dirname, 'benchmarks', BASELINE_FILENAME)
  // const times: number[] = []
  // for (let i = 0; i < 10; i++) {
  //   const { timeMS } = typecheck(baselineFile)
  //   console.log('  Taking baseline measurement', i, '/', 10, `${timeMS}ms`)
  //   times.push(timeMS)
  // }
  const baselineMS = 0 //takeTimeMeasurement(0, times)
  // console.log('  First calculated baseline time of ', baselineMS)
  // console.log('')

  //
  // Benchmark
  //

  console.log('Benchmarking', collections.length, 'collections')

  const overallResultsTable: Record<string, Record<FrameworkLabel, string>> = {}
  for (const { name, variants } of collections) {
    if (
      Array.isArray(selectedTestNames) &&
      selectedTestNames?.length > 0 &&
      !selectedTestNames.some((pattern) => minimatch(name, pattern))
    ) {
      console.log('Skipping benchmarks for:', `"${name}"`)
      continue
    }

    for (const { variant, benchmarks } of Object.values(variants)) {
      console.log('Benchmarking Compiles for case:', `"${name}"`)
      console.log('  Variant:', variant)

      const resultsByFramework: Partial<Record<Framework, number>> = {}
      for (const { relativePath, fullPath, framework } of benchmarks) {
        console.log('    Benchmarking Compile for', relativePath)

        const times: number[] = []
        for (let i = 0; i < samplesPer; i++) {
          const { program, emitResult, timeMS } = typecheck(fullPath)

          times.push(timeMS)

          assertNoErrors(program, emitResult, relativePath)

          const relativeTimeMS = timeMS - baselineMS
          console.debug(
            `      Compiled sample `,
            i,
            '/',
            samplesPer,
            `in ${Math.trunc(relativeTimeMS)}ms (relative to baseline)`
          )
        }

        resultsByFramework[framework] = takeTimeMeasurement(baselineMS, times)
      }

      console.log()
      console.log(`${name} Results`)
      console.table(resultsByFramework)
      console.log()
      console.log('-------------------------')
      console.log()

      function formatTime(framework: Framework) {
        if (typeof resultsByFramework[framework] === 'undefined') {
          return 'n/a'
        }
        return resultsByFramework[framework] + 'ms'
      }
      overallResultsTable[`${name}: ${variant}`] = {
        'Light Type': formatTime('lt'),
        Zod: formatTime('zod'),
        'Typescript (Interfaces)': formatTime('ts'),
        'Typescript (Types)': formatTime('tst'),
      }
    }
  }

  console.log('Results')
  console.table(overallResultsTable, [
    'Typescript (Interfaces)',
    'Typescript (Types)',
    'Light Type',
    'Zod',
  ] as FrameworkLabel[])
}

function takeTimeMeasurement(baselineTime: number, _times: number[]) {
  const times = [..._times]

  times.sort()

  // Take the simple best time
  const ms = times[0]

  return Math.trunc(ms - baselineTime)
}

benchmarkCompiles()
