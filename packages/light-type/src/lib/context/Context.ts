import { LightTypeAggregatedErrors } from '../errors/LightTypeAggregatedErrors'
import { LightTypeError } from '../errors/LightTypeError'
import { Issue } from './Issue'
import { LightTypeContext } from './LightTypeContext'

export interface InternalContext extends LightTypeContext {
  createChild(pathFragment: string): InternalContext
}

const INERNAL_NEVER = null as never

class ChildContext implements InternalContext {
  constructor(private readonly callback: (issue: Issue) => never) {}

  NEVER = INERNAL_NEVER

  addIssue = this.callback

  createChild = (pathFragment: string): InternalContext => {
    const add = this.addIssue

    return new ChildContext((issue) => {
      add({
        ...issue,
        path: join(pathFragment, issue.path),
      })
      return this.NEVER
    })
  }
}

export class Context implements InternalContext {
  private issues: Issue[] = []

  constructor(private readonly path?: string) {}

  /**
   * Useful to satisfy TypeScript where you have called addIssue and just want to return without a valid value
   *
   * ```ts
   * lt.string().pipe((val, ctx) => {
   *    ctx.addIssue({
   *      // etc
   *    })
   *
   *    return ctx.NEVER
   * })
   * ```
   */
  NEVER = INERNAL_NEVER

  /**
   * Add an issue to the context. Can contain either a custom or predefined 'type'
   *
   * lt.string().pipe((val, ctx) => {
   *    ctx.addIssue({
   *      type: 'custom_type
   *      message: 'Custom message'
   *    })
   * })
   * ```
   */
  addIssue = (issue: Issue) => {
    this.issues.push(issue)
    return this.NEVER
  }

  createChild = (pathFragment: string): InternalContext => {
    const add = this.addIssue

    return new ChildContext((issue) => {
      add({
        ...issue,
        path: join(pathFragment, issue.path),
      })
      return INERNAL_NEVER
    })
  }

  anyIssue = () => this.issues.length > 0

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