import { createContext, ReactNode } from 'react'

export type RenderFunctionValueParams = {
  destroy: () => void
}
export type RenderValue =
  | ReactNode
  | ((params: RenderFunctionValueParams) => ReactNode)

export type ImperativeRenderContextType = {
  render: (renderer: RenderValue) => () => void
}
export type ImperativeRenderElementsContextType = Record<string, ReactNode>

export function createContexts() {
  const Render = createContext<ImperativeRenderContextType>({
    render: () => {
      console.error(
        'ImperativeRender Context not initialised. Is the Provider at the top of your app?'
      )

      return () => {
        //
      }
    },
  })

  const Elements = createContext<ImperativeRenderElementsContextType>({})

  return {
    Render,
    Elements,
  }
}

export type Contexts = ReturnType<typeof createContexts>
