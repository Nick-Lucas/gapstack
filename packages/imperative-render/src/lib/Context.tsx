import React, { createContext, ReactNode } from 'react'

import { RendererModel } from './types'

export type RenderContextType<Model extends RendererModel> = {
  render: (renderer: Model) => () => void
}

export type ElementsContextType = Record<string, ReactNode>

export type RenderCallbackParams = {
  destroy: () => void
}
export type RenderCallback<Model extends RendererModel> = (
  model: Model,
  params: RenderCallbackParams
) => ReactNode

export type Contexts<Model extends RendererModel> = {
  Render: React.Context<RenderContextType<Model>>
  Elements: React.Context<ElementsContextType>
}
export function createContexts<Model extends RendererModel>(): Contexts<Model> {
  const Render = createContext<RenderContextType<Model>>({
    render: () => {
      console.error(
        'ImperativeRender Context not initialised. Is the Provider at the top of your app?'
      )

      return () => {
        //
      }
    },
  })

  const Elements = createContext<ElementsContextType>({})

  return {
    Render,
    Elements,
  }
}
