import { createInstance } from '@gapstack/react-imperative-render'
import { useRef } from 'react'

type Model = {
  count: number
}

const ImperativeRenderer = createInstance<Model>({
  container: <ul />,
  renderElement: (model, params) => {
    return <li>Element {model.count}</li>
  },
})

export default function TimedExample() {
  return (
    <ImperativeRenderer.Provider>
      <Component />

      <ImperativeRenderer.Root />
    </ImperativeRenderer.Provider>
  )
}

export function Component() {
  const counter = useRef(0)

  const render = ImperativeRenderer.useTimed({
    timeout: 1000,
  })

  return (
    <button
      onClick={() => {
        const count = counter.current++

        render({
          count,
        })
      }}
    >
      Add Element for 1000ms
    </button>
  )
}
