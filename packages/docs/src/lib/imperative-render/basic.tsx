import { createInstance } from '@gapstack/react-imperative-render'
import { useRef } from 'react'

const ImperativeRenderer = createInstance()

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

  const render = ImperativeRenderer.useImperativeRender()

  return (
    <button
      onClick={() => {
        const count = counter.current++

        const destroy = render(<li>Element {count}</li>)

        setTimeout(destroy, 1000)
      }}
    >
      Add Element for 1000ms
    </button>
  )
}
