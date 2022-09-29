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

export const ImperativeRenderContext =
  createContext<ImperativeRenderContextType>({
    render: () => () => {
      console.error('ImperativeRenderContext not initialised')
    },
  })
export const ImperativeRenderElementsContext =
  createContext<ImperativeRenderElementsContextType>({})
