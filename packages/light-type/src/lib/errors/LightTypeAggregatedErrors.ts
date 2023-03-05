import { Issue } from '../context/Issue'

export class LightTypeAggregatedErrors extends Error {
  constructor(readonly issues: Issue[]) {
    super('LightTypeAggregatedErrors: ' + JSON.stringify(issues, null, 2))

    Object.setPrototypeOf(this, LightTypeAggregatedErrors.prototype)
  }
}
