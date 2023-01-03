import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'

import { RendererModel } from './types'

export type RenderUtils = {
  destroy: () => void
}

type RootItem<Model extends RendererModel = RendererModel> = {
  key: symbol
  model: Model
  utils: RenderUtils
}
type KeyedRoots = Record<symbol, RootItem[]>

type Subscription = (items: RootItem[]) => void

type Renderer<Model extends RendererModel> =
  | Model
  | ((params: RenderUtils) => Model)

type RenderContextType = {
  render: <Model extends RendererModel>(
    rootKey: symbol,
    renderer: Renderer<Model>
  ) => RenderUtils

  subscribe: (
    rootKey: symbol,
    callback: () => void
  ) => {
    unsubscribe: () => void
  }

  getItemsToRender: <Model extends RendererModel>(
    rootKey: symbol
  ) => RootItem<Model>[]
}

const Context = createContext<RenderContextType>({
  render() {
    console.error(
      'ImperativeRender Context not available. Is ImperativeRenderProvider at the top of your app?'
    )

    return {
      destroy: () => {
        //
      },
    }
  },
  getItemsToRender: () => [],
  subscribe: () => {
    console.error(
      'ImperativeRender Context not available. Is ImperativeRenderProvider at the top of your app?'
    )

    return {
      unsubscribe: () => {
        //
      },
    }
  },
})

type KeyedMap<T> = Record<symbol, T>

export function ImperativeRenderProvider(props: Record<string, unknown>) {
  const rootsByKey = useRef<KeyedRoots>({})
  const subscribers = useRef<KeyedMap<KeyedMap<Subscription>>>({})

  const value = useMemo<RenderContextType>(() => {
    function dispatchChangeEvent(rootKey: symbol) {
      rootsByKey.current[rootKey] ??= []
      const items = rootsByKey.current[rootKey]

      subscribers.current[rootKey] ??= {}
      const rootKeySubscribers = subscribers.current[rootKey]
      const keys = Object.getOwnPropertySymbols(rootKeySubscribers)

      for (const key of keys) {
        const subscriber = rootKeySubscribers[key]

        subscriber(items)
      }
    }

    return {
      render(rootKey, renderer) {
        const key = Symbol('imperative-render:render-item')

        rootsByKey.current[rootKey] ??= []

        const utils: RenderUtils = {
          destroy() {
            const next = [...rootsByKey.current[rootKey]]
            next.splice(next.findIndex((item) => item.key === key))
            rootsByKey.current[rootKey] = next

            dispatchChangeEvent(rootKey)
          },
        }

        const model =
          typeof renderer === 'function' ? renderer(utils) : renderer

        rootsByKey.current[rootKey] = [
          ...rootsByKey.current[rootKey],
          {
            key: key,
            model: model,
            utils: utils,
          },
        ]

        dispatchChangeEvent(rootKey)

        return utils
      },
      subscribe(rootKey, callback) {
        const key = Symbol('imperative-render:subscription')

        subscribers.current[rootKey] ??= {}
        subscribers.current[rootKey][key] = callback

        return {
          unsubscribe() {
            delete subscribers.current[rootKey][key]
          },
        }
      },
      getItemsToRender<Model extends RendererModel>(
        rootKey: symbol
      ): RootItem<Model>[] {
        rootsByKey.current[rootKey] ??= []

        const items = rootsByKey.current[rootKey]

        return items as RootItem<Model>[]
      },
    }
  }, [])

  return <Context.Provider {...props} value={value} />
}

export function useInternalRenderSubscription<Model extends RendererModel>(
  rootKey: symbol
) {
  const { render } = useContext(Context)

  return useMemo(() => {
    return {
      render(renderer: Renderer<Model>) {
        return render(rootKey, renderer)
      },
    }
  }, [render, rootKey])
}

export function useInternalRootSubscription<Model extends RendererModel>(
  rootKey: symbol
): RootItem<Model>[] {
  const { subscribe, getItemsToRender } = useContext(Context)

  const subscribeAsExternalStore = useCallback(
    (onStoreChange: () => void) => {
      const { unsubscribe } = subscribe(rootKey, onStoreChange)

      return unsubscribe
    },
    [rootKey, subscribe]
  )

  const getSnapshot = useCallback(() => {
    return getItemsToRender<Model>(rootKey)
  }, [getItemsToRender, rootKey])

  const items = useSyncExternalStore(
    subscribeAsExternalStore,
    getSnapshot
    // TODO: actually support SSR
    // () => getItemsToRender(rootKey)
  )

  return items
}
