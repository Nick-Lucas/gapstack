import { RendererModel } from './types'
import { createHooks } from './hooks'
import { createRoot, RootOptions } from './Root'

export type InstanceOptions<Model extends RendererModel> = RootOptions<Model>

export type Instance<Model extends RendererModel> = ReturnType<
  typeof createHooks<Model>
> & {
  Root: ReturnType<typeof createRoot<Model>>
}
/**
 * Creates an Imperative Renderer instance along with your chosen markup.
 *
 * You need at least one of these in your applications
 */

export function createInstance<Model extends RendererModel = RendererModel>(
  options: InstanceOptions<Model>
): Instance<Model> {
  const rootKey = Symbol('imperative-render:instance-root-key')

  const hooks = createHooks<Model>(rootKey)
  const Root = createRoot<Model>(rootKey, options)

  return {
    ...hooks,
    Root,
  }
}
