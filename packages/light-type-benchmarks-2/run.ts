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

const Frameworks = ['lt', 'zod'] as const
type Framework = typeof Frameworks[number]
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

function listBenchmarks(): Collection[] {
  const collections: Record<string, Collection> = {}

  const files = fs
    .readdirSync(path.join(__dirname, 'benchmarks'))
    .filter((f) => !f.startsWith('.'))

  for (const f of files) {
    const [name, variantName, maybeFramework] = f.split(/\./)

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

  const baselineFile = path.join(__dirname, 'benchmarks', '.empty-baseline.ts')
  const times: number[] = []
  for (let i = 0; i < samplesPer; i++) {
    console.log('  Taking baseline measurement', i, '/', samplesPer)
    const { timeMS } = typecheck(baselineFile)
    times.push(timeMS)
  }
  const baselineMS = takeAverageMS(times, samplesPer)
  console.log('  First calculated baseline time of ', baselineMS)
  console.log('')

  //
  // Benchmark
  //

  console.log('Benchmarking', collections.length, 'collections')

  for (const { name, variants } of collections) {
    console.log('Benchmarking Compiles for case:', `"${name}"`)

    const resultsByFramework: Partial<Record<Framework, number>> = {}
    for (const { variant, benchmarks, cases } of Object.values(variants)) {
      console.log('  Variant:', variant)

      for (const { relativePath, fullPath, framework } of benchmarks) {
        let times: number[] = []
        for (let i = 0; i < samplesPer; i++) {
          console.log('    Benchmarking Compile for', relativePath)

          const { program, emitResult, timeMS } = typecheck(fullPath)

          //
          // Report Time
          //

          times.push(timeMS)

          //
          // Report Errors
          //

          let preEmitDiagnostics = getPreEmitDiagnostics(program).concat(
            emitResult.diagnostics
          )
          for (const d of preEmitDiagnostics) {
            console.error('    PreEmit Diagnostic Error: ', d.messageText)
            throw 'File could not compile: ' + relativePath
          }

          console.debug(
            '    Compiled sample',
            i,
            '/',
            samplesPer,
            '-',
            timeMS - baselineMS,
            'ms'
          )
        }

        resultsByFramework[framework] = Math.trunc(
          takeAverageMS(times, samplesPer) - baselineMS
        )
      }

      console.log('Average results')
      console.table(resultsByFramework)
    }
  }
}

function takeAverageMS(_times: number[], samplesPer: number) {
  const times = [..._times]

  times.sort()

  // Remove Outliers
  console.log('    Discarding Slowest', [times.pop(), times.pop()])
  console.log('    Discarding Fastest', times.splice(0, 2))

  const averageMS = times.reduce((sum, num) => sum + num, 0) / times.length

  return averageMS
}

function typecheck(fullPath: string) {
  const program = createProgram([fullPath], {
    baseUrl: __dirname,
    strict: true,
    allowSyntheticDefaultImports: true,
    noEmit: true,
    skipLibCheck: true,
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
