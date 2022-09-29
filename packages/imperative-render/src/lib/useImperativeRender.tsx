import { useContext } from 'react'
import { ImperativeRenderContext } from './Context'

export function useImperativeRender() {
  const context = useContext(ImperativeRenderContext)

  return context.render
}
