import { ReactNode } from 'react'

import { createContexts } from './Context'
import { createProvider, ProvideMultiple } from './Providers'
import { createHooks } from './hooks'
import { createRoot } from './Root'

export function createInstance() {
  const contexts = createContexts()
  const Provider = createProvider(contexts)
  const hooks = createHooks(contexts)
  const Root = createRoot(contexts)

  return {
    ...hooks,
    Provider,
    Root,
  }
}

export type Instance = ReturnType<typeof createInstance>

export function createMergedProvider(instances: Instance[]) {
  const Providers = instances.map((i) => i.Provider)

  return function Provider(props: { children: ReactNode }) {
    return (
      <ProvideMultiple Providers={Providers}>{props.children}</ProvideMultiple>
    )
  }
}
