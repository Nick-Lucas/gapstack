import fs from 'fs'
import path from 'path'
import { Cases, Collection, Framework, Frameworks } from './types'

export function isFramework(
  file: string,
  framework: string
): asserts framework is Framework | typeof Cases {
  if (framework !== 'cases' && !Frameworks.includes(framework as Framework)) {
    throw `File ${file} has invalid framework: ${framework}`
  }
}

export function getDeepFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true })

  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name)
    return dirent.isDirectory() ? getDeepFiles(res) : res
  })

  return Array.prototype.concat(...files)
}

export const BASELINE_FILENAME = '.empty-baseline.ts'

export function listBenchmarks(): Collection[] {
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
