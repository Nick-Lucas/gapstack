import { Issue } from './Issue'

export interface LightTypeContext {
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
  NEVER: never

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
  addIssue(issue: Issue): never

  /**
   * Find if any issue has been added to the context. Can be used to determine whether to return early
   */
  anyIssue(): boolean
}
