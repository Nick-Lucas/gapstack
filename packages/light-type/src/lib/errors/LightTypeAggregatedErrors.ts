import { LightTypeError } from './LightTypeError'

export class LightTypeAggregatedErrors extends Error {
  constructor(readonly errors: LightTypeError[]) {
    super('LightTypeAggregatedErrors')

    Object.setPrototypeOf(this, LightTypeAggregatedErrors.prototype)
  }
}
