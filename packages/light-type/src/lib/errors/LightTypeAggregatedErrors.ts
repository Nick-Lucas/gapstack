import { LightTypeError } from './LightTypeError'

export class LightTypeErrorAggregator {
  readonly errors: LightTypeError[] = []

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

  throwIfAny = () => {
    if (this.errors.length === 0) {
      return
    }

    throw new LightTypeAggregatedErrors(this.errors)
  }
}

export class LightTypeAggregatedErrors extends Error {
  constructor(readonly errors: LightTypeError[]) {
    super('LightTypeAggregatedErrors')

    Object.setPrototypeOf(this, LightTypeAggregatedErrors.prototype)
  }
}
