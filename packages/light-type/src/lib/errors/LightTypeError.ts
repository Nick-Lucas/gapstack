import { Issue } from '../context/Issue'

type LightTypeErrorOpts = Issue

export class LightTypeError extends Error {
  readonly path?: string
  readonly value: unknown

  constructor({ path, message, value }: LightTypeErrorOpts) {
    super(message)

    this.path = path
    this.value = value

    Object.setPrototypeOf(this, LightTypeError.prototype)
  }
}
