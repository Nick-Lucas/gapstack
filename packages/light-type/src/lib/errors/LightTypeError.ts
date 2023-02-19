import { Issue } from './IssueContext'

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

  withParent = (pathFragment: string) => {
    const path =
      typeof this.path === 'string' && this.path.length > 0
        ? `${pathFragment}.${this.path}`
        : pathFragment

    return new LightTypeError({
      message: this.message,
      value: this.value,
      path: path,
    })
  }
}
