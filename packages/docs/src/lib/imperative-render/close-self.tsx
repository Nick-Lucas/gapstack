import { createInstance } from '@gapstack/react-imperative-render'
import { useRef } from 'react'

const ImperativeRenderer = createInstance()

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

  const render = ImperativeRenderer.useImperativeRender()

  return (
    <button
      onClick={() => {
        const count = counter.current++

        render((params) => (
          <li>
            Element {count} <button onClick={params.destroy}>Dismiss</button>
          </li>
        ))
      }}
    >
      Add Element until dismissed
    </button>
  )
}
