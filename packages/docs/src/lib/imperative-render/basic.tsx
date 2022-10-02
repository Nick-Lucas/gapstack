import { createInstance } from '@gapstack/react-imperative-render'
import { useRef } from 'react'

type Model = {
  count: number
}

const ImperativeRenderer = createInstance<Model>({
  renderElement: (model, params) => {
    return <li>Element {model.count}</li>
  },
})

export default function BasicExample() {
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

        const destroy = render({
          count,
        })

        setTimeout(destroy, 1000)
      }}
    >
      Add Element for 1000ms
    </button>
  )
}
