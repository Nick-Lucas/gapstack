import { useCallback, useContext, useState } from 'react'
import { Contexts } from './Context'
import { RendererModel } from './types'

export type AlertOptions = {
  timeout: number
}
const defaultAlertOptions: AlertOptions = {
  timeout: 1500,
}

export function createHooks<Model extends RendererModel>(
  contexts: Contexts<Model>
) {
  function useRender() {
    const context = useContext(contexts.Render)

    return context.render
  }

  function useAlert(staticOptions: Partial<AlertOptions>) {
    const render = useRender()
    const [cachedStaticOptions] = useState(staticOptions)

    return useCallback(
      (model: Model, renderOptions: Partial<AlertOptions>) => {
        const opts: AlertOptions = {
          ...defaultAlertOptions,
          ...cachedStaticOptions,
          ...renderOptions,
        }

        const destroy = render(model)
        setTimeout(destroy, opts.timeout)
      },
      [cachedStaticOptions, render]
    )
  }

  return {
    useRender,
    useAlert,
  }
}
