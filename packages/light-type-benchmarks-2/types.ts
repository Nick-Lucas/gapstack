const FrameworkLabels = {
  lt: 'Light Type',
  ts: 'Typescript (Interfaces)',
  tst: 'Typescript (Types)',
  zod: 'Zod',
} as const

export type Framework = keyof typeof FrameworkLabels

export type FrameworkLabel = typeof FrameworkLabels[Framework]

export const Frameworks = Object.keys(FrameworkLabels) as Framework[]

export const Cases = 'cases' as const

type BenchmarkFile = {
  framework: Framework
  relativePath: string
  fullPath: string
}

type BenchmarkCases = {
  relativePath: string
  fullPath: string
}

export type Collection = {
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
