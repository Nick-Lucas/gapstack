// list all benchmarks in benchmarks dir

// parse their names from format
// {name}.{library}.{variantNum | 'inputs'}.ts

// Run TSC on each one individually, multiple times
// Store results

// Run Inputs through each one multiple times
// Store results

// Report results comparing each framework and impl variant for each test name

// Profit

import { createProgram, getPreEmitDiagnostics, Program } from 'typescript'
import fs from 'fs'
import path from 'path'
import { performance } from 'perf_hooks'
import { parseArgs } from 'util'

const args = parseArgs({
  options: {
    name: {
      type: 'string',
      multiple: true,
    },
  },
})
const selectedTestNames = args.values.name

console.log('Running tests matching names:', selectedTestNames ?? '{any}')

const FrameworkLabels = {
  lt: 'Light Type',
  ts: 'Typescript (Interfaces)',
  tst: 'Typescript (Types)',
  zod: 'Zod',
} as const
type Framework = keyof typeof FrameworkLabels
type FrameworkLabel = typeof FrameworkLabels[Framework]
const Frameworks = Object.keys(FrameworkLabels) as Framework[]

const Cases = 'cases' as const

type BenchmarkFile = {
  framework: Framework
  relativePath: string
  fullPath: string
}

type BenchmarkCases = {
  relativePath: string
  fullPath: string
}

type Collection = {
  name: string
  variants: Record<
    string,
    {
      variant: string
      benchmarks: BenchmarkFile[]
      cases?: BenchmarkCases
    }
  >
}

function isFramework(
  file: string,
  framework: string
): asserts framework is Framework | typeof Cases {
  if (framework !== 'cases' && !Frameworks.includes(framework as any)) {
    throw `File ${file} has invalid framework: ${framework}`
  }
}

function getDeepFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true })

  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name)
    return dirent.isDirectory() ? getDeepFiles(res) : res
  })

  return Array.prototype.concat(...files)
}

const BASELINE_FILENAME = '.empty-baseline.ts'

function listBenchmarks(): Collection[] {
  const collections: Record<string, Collection> = {}

  const benchmarksDir = path.join(__dirname, 'benchmarks')
  const files = getDeepFiles(path.join(__dirname, 'benchmarks'))
    .filter((f) => !f.endsWith(BASELINE_FILENAME))
    .map((f) => f.replace(benchmarksDir, ''))

  for (const f of files) {
    const segments = f.split(/\//)
    const name = segments
      .slice(0, segments.length - 1)
      .filter(Boolean)
      .join('.')
    const [variantName, maybeFramework] =
      segments[segments.length - 1].split(/\./)

    isFramework(f, maybeFramework)

    collections[name] ??= {
      name: name,
      variants: {},
    }
    const collection = collections[name]

    collection.variants[variantName] ??= {
      variant: variantName,
      benchmarks: [],
    }
    const variant = collection.variants[variantName]

    if (maybeFramework === 'cases') {
      variant.cases = {
        relativePath: path.join('./', 'benchmarks', f),
        fullPath: path.join(__dirname, 'benchmarks', f),
      }
    } else {
      variant.benchmarks.push({
        framework: maybeFramework,
        relativePath: path.join('./', 'benchmarks', f),
        fullPath: path.join(__dirname, 'benchmarks', f),
      })
    }
  }

  return Object.values(collections)
}

function benchmarkCompiles() {
  const collections = listBenchmarks()

  const samplesPer = 6

  //
  // Calculate a baseline time
  // The time which typescript takes to load a file and setup
  //

  const baselineFile = path.join(__dirname, 'benchmarks', BASELINE_FILENAME)
  const times: number[] = []
  for (let i = 0; i < samplesPer; i++) {
    console.log('  Taking baseline measurement', i, '/', samplesPer)
    const { timeMS } = typecheck(baselineFile)
    times.push(timeMS)
  }
  const baselineMS = takeTimeMeasurement(0, times)
  console.log('  First calculated baseline time of ', baselineMS)
  console.log('')

  //
  // Benchmark
  //

  console.log('Benchmarking', collections.length, 'collections')

  const overallResultsTable: Record<string, Record<FrameworkLabel, string>> = {}
  for (const { name, variants } of collections) {
    if (!(selectedTestNames?.includes(name) ?? true)) {
      console.log('Skipping benchmarks for:', `"${name}"`)
      continue
    }

    console.log('Benchmarking Compiles for case:', `"${name}"`)

    for (const { variant, benchmarks, cases } of Object.values(variants)) {
      console.log('  Variant:', variant)

      const resultsByFramework: Partial<Record<Framework, number>> = {}
      for (const { relativePath, fullPath, framework } of benchmarks) {
        console.log('    Benchmarking Compile for', relativePath)

        let times: number[] = []
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

      console.log('Average results')
      console.table(resultsByFramework)

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

function assertNoErrors(
  program: Program,
  emitResult: ReturnType<Program['emit']>,
  relativePath: string
) {
  let preEmitDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics
  )
  for (const d of preEmitDiagnostics) {
    console.error('    PreEmit Diagnostic Error: ', d.messageText)
    throw 'File could not compile: ' + relativePath
  }
}

function takeTimeMeasurement(baselineTime: number, _times: number[]) {
  const times = [..._times]

  times.sort()

  // Remove Outliers
  // times.pop()
  // times.pop()
  // times.splice(0, 2)
  // const ms = times.reduce((sum, num) => sum + num, 0) / times.length

  // Take the simple best time
  const ms = times[0]

  return Math.trunc(ms - baselineTime)
}

function typecheck(fullPath: string) {
  const program = createProgram([fullPath], {
    baseUrl: __dirname,
    strict: true,
    allowSyntheticDefaultImports: true,
    noEmit: true,
    skipLibCheck: true,
    paths: {
      'dist-lt': ['../../dist/packages/light-type/src'],
    },
  })

  const start = performance.now()
  const emitResult = program.emit()
  const end = performance.now()
  const timeMS = end - start

  return {
    program,
    emitResult,
    timeMS,
  }
}

benchmarkCompiles()
