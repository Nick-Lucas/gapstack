import {
  createInstance,
  ImperativeRenderProvider,
} from '@gapstack/react-imperative-render'
import { useRef } from 'react'

type Model = {
  count: number
}

const ImperativeRenderer = createInstance<Model>({
  container: <ul />,
  renderElement: (model, params) => {
    return (
      <li>
        Element {model.count} <button onClick={params.destroy}>Dismiss</button>
      </li>
    )
  },
})

export default function CloseSelfExample() {
  return (
    <ImperativeRenderProvider>
      <Component />

      <ImperativeRenderer.Root />
    </ImperativeRenderProvider>
  )
}

export function Component() {
  const counter = useRef(0)

  const render = ImperativeRenderer.useRender()

  return (
    <button
      onClick={() => {
        const count = counter.current++

        render({
          count,
        })
      }}
    >
      Add Element until dismissed
    </button>
  )
}
