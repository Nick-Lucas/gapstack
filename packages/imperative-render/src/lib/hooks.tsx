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

  function useTimed(staticOptions: Partial<AlertOptions> | undefined = {}) {
    const render = useRender()
    const [cachedStaticOptions] = useState(staticOptions)

    return useCallback(
      (model: Model, renderOptions: Partial<AlertOptions> | undefined = {}) => {
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

  function usePromise() {
    const render = useRender()

    return useCallback(
      async function <T>(model: Model, promise: Promise<T>): Promise<T> {
        const destroy = render(model)

        try {
          return await promise
        } finally {
          destroy()
        }
      },
      [render]
    )
  }

  return {
    /**
     * The simplest hook. Returns a function which will render a given model and let you destroy it
     */
    useRender,
    /**
     * Used to create a short-lived element which will be automatically destroyed in the future
     */
    useTimed,
    /**
     * Used to create an element for the duration of a Promise.
     * For instance some visual feedback like a notification, or a loading spinner.
     */
    usePromise,
  }
}
