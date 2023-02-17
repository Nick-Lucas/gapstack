import { LightTypeError } from './LightTypeError'

// TODO: separate this into an aggregator and error throw, stack currently gets captured on new-up
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

  throwIfAny = () => {
    if (this.errors.length === 0) {
      return
    }

    this.message = this.toString()

    throw this
  }

  override toString() {
    return 'Light Type errors:' + JSON.stringify(this.errors, null, 2)
  }
}
