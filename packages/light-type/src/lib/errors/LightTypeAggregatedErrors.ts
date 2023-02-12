import { LightTypeError } from './LightTypeError'

export class LightTypeAggregatedErrors extends Error {
  readonly errors: LightTypeError[] = []

  constructor() {
    super('LightTypeAggregatedErrors')

    Object.setPrototypeOf(this, LightTypeAggregatedErrors.prototype)
  }

  aggregate = (basePath: string, callback: () => void) => {
    try {
      callback()
    } catch (err) {
      if (err instanceof LightTypeError) {
        this.errors.push(err.withParent(basePath))
      } else if (err instanceof LightTypeAggregatedErrors) {
        for (const e of err.errors) {
          this.errors.push(e.withParent(basePath))
        }
      } else {
        throw err
      }
    }

    return undefined
  }

  propagate = () => {
    if (this.errors.length === 0) {
      return
    }

    throw this
  }
}
