import { ErrorType } from './ErrorType'
import { LightTypeAggregatedErrors } from './LightTypeAggregatedErrors'
import { LightTypeError } from './LightTypeError'

export interface Issue {
  type?: ErrorType
  message: string
  value: unknown
  path?: string
}

export interface LightTypeContext {
  issue(issue: Issue): void
}

export interface InternalContext extends LightTypeContext {
  createChild(pathFragment: string): InternalContext
}

class ChildContext implements InternalContext {
  constructor(private readonly callback: (issue: Issue) => void) {}

  issue = this.callback

  createChild = (pathFragment: string): InternalContext => {
    const add = this.issue

    return new ChildContext((issue) => {
      add({
        ...issue,
        path: join(pathFragment, issue.path),
      })
    })
  }
}

export class Context implements InternalContext {
  private issues: Issue[] = []

  constructor(private readonly path?: string) {}

  issue = (issue: Issue) => {
    this.issues.push(issue)

    return this
  }

  createChild = (pathFragment: string): InternalContext => {
    const add = this.issue

    return new ChildContext((issue) => {
      add({
        ...issue,
        path: join(pathFragment, issue.path),
      })
    })
  }

  any = () => this.issues.length > 0

  throwIfAny = () => {
    if (this.issues.length > 0) {
      throw new LightTypeAggregatedErrors(
        this.issues.map((issue) => {
          return new LightTypeError(issue)
        })
      )
    }
  }
}

function join(path1?: string, path2?: string) {
  const p1 = path1?.trim()
  const p2 = path2?.trim()

  if (!p1 && !p2) {
    return undefined
  }

  if (!p1) {
    return p2
  }

  if (!p2) {
    return p1
  }

  return `${p1}.${p2}`
}
