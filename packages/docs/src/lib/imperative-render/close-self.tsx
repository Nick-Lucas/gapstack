import { createInstance } from '@gapstack/react-imperative-render'
import { useRef } from 'react'

type Model = {
  count: number
}

const ImperativeRenderer = createInstance<Model>({
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
    <ImperativeRenderer.Provider>
      <Component />

      <ImperativeRenderer.Root container={<ul />} />
    </ImperativeRenderer.Provider>
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
