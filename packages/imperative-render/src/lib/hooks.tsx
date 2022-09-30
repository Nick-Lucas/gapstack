import { useContext } from 'react'
import { Contexts } from './Context'

export function createHooks(contexts: Contexts) {
  function useImperativeRender() {
    const context = useContext(contexts.Render)

    return context.render
  }

  return {
    useImperativeRender,
  }
}
