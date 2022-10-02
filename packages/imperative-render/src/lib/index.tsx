import React, { ReactNode } from 'react'

import { RendererModel } from './types'
import { createContexts } from './Context'
import { createProvider, ProvideMultiple, ProviderOptions } from './Providers'
import { createHooks } from './hooks'
import { createRoot, RootOptions } from './Root'

export type InstanceOptions<Model extends RendererModel> =
  ProviderOptions<Model> & RootOptions

export type Instance<Model extends RendererModel> = ReturnType<
  typeof createHooks<Model>
> & {
  Provider: ReturnType<typeof createProvider<Model>>
  Root: ReturnType<typeof createRoot<Model>>
}

export function createInstance<Model extends RendererModel = RendererModel>(
  options: InstanceOptions<Model>
): Instance<Model> {
  const contexts = createContexts<Model>()
  const Provider = createProvider(contexts, options)
  const hooks = createHooks(contexts)
  const Root = createRoot(contexts, options)

  return {
    ...hooks,
    Provider,
    Root,
  }
}

export function createMergedProvider(
  instances: { Provider: React.FC<{ children: ReactNode }> }[]
) {
  const Providers = instances.map((i) => i.Provider)

  return function Provider(props: { children: ReactNode }) {
    return (
      <ProvideMultiple Providers={Providers}>{props.children}</ProvideMultiple>
    )
  }
}
