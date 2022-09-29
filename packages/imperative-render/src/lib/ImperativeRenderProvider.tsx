import { ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import {
  ImperativeRenderContext,
  ImperativeRenderContextType,
  ImperativeRenderElementsContext,
  ImperativeRenderElementsContextType,
} from './Context'

export type ImperativeRenderProviderProps = {
  children: ReactNode
}

export function ImperativeRenderProvider({
  children,
}: ImperativeRenderProviderProps) {
  const counter = useRef(0)
  const [elements, setElements] = useState<ImperativeRenderElementsContextType>(
    {}
  )

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

      if (typeof element === 'function') {
        setElements((els) => ({
          ...els,
          [key]: element({
            destroy,
          }),
        }))
      } else {
        setElements((els) => ({
          ...els,
          [key]: element,
        }))
      }

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
    <ImperativeRenderContext.Provider value={renderContextValue}>
      <ImperativeRenderElementsContext.Provider value={elements}>
        {children}
      </ImperativeRenderElementsContext.Provider>
    </ImperativeRenderContext.Provider>
  )
}
