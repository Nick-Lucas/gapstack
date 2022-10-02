# React Imperative Render

A headless and unopinionated solution to rendering elements from within callbacks and effects. Inspired by [Ant Design's Notifications](https://ant.design/components/notification/) and [Notistack](https://github.com/iamhosseindhv/notistack) but designed to be UI framework agnostic and useful for much more than toast style notifications.

### Should you use this?

Rendering elements imperatively _can be an anti-pattern_. There are good reasons that react pushes us towards declarative rendering, so this is not an excuse to stop doing that.

This said, doing things declaratively can also be considered an anti-pattern at times, for instance when building modals the need to manage aspects like an `isOpen` state to move a user through a flow can add a lot of complexity and indirection, where it might be cleanest to handle this within the callback which triggers it.

As a rule of thumb, if you want to serve ethemeral information or UI in response to a user interaction, or do more after some period of time or future interaction, imperative-render might be a clean solution.

### Installation

```sh
# NPM
npm install @gapstack/react-imperative-render

# Yarn
yarn add @gapstack/react-imperative-render
```

### Basic Usage

```tsx
import { createInstance } from '@gapstack/react-imperative-render'
import { useRef } from 'react'

// A Renderer requires an model used to render elements
type Model = {
  count: number
}

// Create an instance 
const ImperativeRenderer = createInstance<Model>({
  container: <ul />,
  renderElement: (model, params) => {
    return <li>Element {model.count}</li>
  },
})

// Render the Provider and the Root element
export default function BasicExample() {
  return (
    <ImperativeRenderer.Provider>
      <Component />

      <ImperativeRenderer.Root />
    </ImperativeRenderer.Provider>
  )
}

export function Component() {
  const counter = useRef(0)

  // There are multiple hooks for difference use cases
  const render = ImperativeRenderer.useRender()

  return (
    <button
      onClick={() => {
        const count = counter.current++

        // The render hook just returns a destroy function
        const destroy = render({
          count,
        })
      }}
    >
      Add Element
    </button>
  )
}
```

### Multiple Renderers

```jsx
import { createInstance, createMergedProvider } from '@gapstack/react-imperative-render'

// By creating multiple renderers you can have different behaviours and styles for different use cases
const AlertsRenderer = createInstance(/**/)
const ModalRenderer = createInstance(/**/)

// imperative-render provides a tiny utility to roll up multiple instances into one Provider component.
// You can use it to avoid mad Context Provider stacks!
const MergedProvider = createMergedProvider([
  AlertsRenderer,
  ModalRenderer
])

function Main() {
  return (
    <MergedProvider>
      <MyComponent />

      <AlertsRenderer.Root />
      <ModalRenderer.Root />
    </MergedProvider>
  )
}
```
