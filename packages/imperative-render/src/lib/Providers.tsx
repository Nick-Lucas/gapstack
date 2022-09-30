import { ReactNode, useCallback, useMemo, useRef, useState, FC } from 'react'
import {
  Contexts,
  ImperativeRenderContextType,
  ImperativeRenderElementsContextType,
} from './Context'

export type ImperativeRenderProviderProps = {
  children: ReactNode
}

export function createProvider(contexts: Contexts) {
  return function Provider({ children }: ImperativeRenderProviderProps) {
    const counter = useRef(0)
    const [elements, setElements] =
      useState<ImperativeRenderElementsContextType>({})

    const render = useCallback<ImperativeRenderContextType['render']>(
      (element) => {
        const key = 'EL_' + counter.current++
        const destroy = () => {
          setElements((els) => {
            const nextEls = { ...els }
            delete nextEls[key]
            return nextEls
          })
        }

        const el =
          typeof element === 'function' ? element({ destroy }) : element

        setElements((els) => ({
          ...els,
          [key]: el,
        }))

        return destroy
      },
      []
    )

    const renderContextValue = useMemo<ImperativeRenderContextType>(() => {
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
  const [Component, ...Rest] = Providers

  if (Rest.length === 0) {
    return <Component>{children}</Component>
  } else {
    return (
      <Component>
        <ProvideMultiple Providers={Rest}>{children}</ProvideMultiple>
      </Component>
    )
  }
}
