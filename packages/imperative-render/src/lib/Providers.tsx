import { ReactNode, useCallback, useMemo, useRef, useState, FC } from 'react'
import {
  Contexts,
  RenderContextType,
  ElementsContextType,
  RenderCallback,
} from './Context'
import { RendererModel } from './types'

export type ProviderOptions<Model extends RendererModel> = {
  renderElement: RenderCallback<Model>
}

export type ImperativeRenderProviderProps = {
  children: ReactNode
}

export function createProvider<Model extends RendererModel>(
  contexts: Contexts<Model>,
  options: ProviderOptions<Model>
) {
  return function Provider({ children }: ImperativeRenderProviderProps) {
    const counter = useRef(0)
    const [elements, setElements] = useState<ElementsContextType>({})

    const render = useCallback<RenderContextType<Model>['render']>((model) => {
      const key = 'EL_' + counter.current++
      const destroy = () => {
        setElements((els) => {
          const nextEls = { ...els }
          delete nextEls[key]
          return nextEls
        })
      }

      setElements((els) => ({
        ...els,
        // TODO: maybe move this down-stream to only store the model data in state instead of the ReactNodes
        [key]: options.renderElement(model, { destroy }),
      }))

      return destroy
    }, [])

    const renderContextValue = useMemo<RenderContextType<Model>>(() => {
      return {
        render,
      }
    }, [render])

    return (
      <contexts.Render.Provider value={renderContextValue}>
        <contexts.Elements.Provider value={elements}>
          {children}
        </contexts.Elements.Provider>
      </contexts.Render.Provider>
    )
  }
}

export type ProvideMultipleProps = {
  Providers: FC<{ children: ReactNode }>[]
  children: ReactNode
}

export function ProvideMultiple({ Providers, children }: ProvideMultipleProps) {
  const [Provider, ...RemainingProviders] = Providers

  if (RemainingProviders.length === 0) {
    return <Provider>{children}</Provider>
  } else {
    return (
      <Provider>
        <ProvideMultiple Providers={RemainingProviders}>
          {children}
        </ProvideMultiple>
      </Provider>
    )
  }
}
