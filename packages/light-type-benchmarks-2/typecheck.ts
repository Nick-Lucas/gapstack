import {
  createProgram as tCreateProgram,
  getPreEmitDiagnostics,
  Program,
} from 'typescript'
import { performance } from 'perf_hooks'

export function createProgram(fullPaths: string[]) {
  return tCreateProgram(fullPaths, {
    baseUrl: __dirname,
    strict: true,
    allowSyntheticDefaultImports: true,
    noEmit: true,
    skipLibCheck: true,
    paths: {
      'dist-lt': ['../../dist/packages/light-type/src'],
    },
  })
}

export function typecheck(fullPath: string, _program?: Program) {
  const program = _program ?? createProgram([fullPath])

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

export function assertNoErrors(
  program: Program,
  emitResult: ReturnType<Program['emit']>,
  relativePath: string
) {
  const preEmitDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics
  )
  for (const d of preEmitDiagnostics) {
    console.error('    PreEmit Diagnostic Error: ', d.messageText)
    throw 'File could not compile: ' + relativePath
  }
}
