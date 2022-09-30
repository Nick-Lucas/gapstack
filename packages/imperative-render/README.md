# React Imperative Render

A headless and unopinionated solution to rendering elements from within callbacks and effects. Inspired by [Ant Design's Notifications](https://ant.design/components/notification/) and [Notistack](https://github.com/iamhosseindhv/notistack) but designed to be UI framework agnostic and useful for much more than toast style notifications.

### Should you use this?


Rendering elements imperatively _can be an anti-pattern_. There are good reasons that react pushes us towards declarative rendering, so this is not an excuse to stop doing that.

This said, doing things declaratively can also be considered an anti-pattern at times, for instance when building modals the need to manage aspects like an `isOpen` state can add a lot of complexity and indirection, where it might be cleanest to handle an entire confirmation flow within the callback which triggers it.

As a rule of thumb, if you want to serve information or UI in response to a user interaction, and do more after a period of time or future interaction, imperative-render might be a clean solution.

### Installation

```sh
# NPM
npm install @gapstack/react-imperative-render

# Yarn
yarn add @gapstack/react-imperative-render
```

### Basic Usage

```jsx
import { createInstance } from '@gapstack/react-imperative-render'

// Create an instance for your use case
const AlertsRenderer = createInstance()

function Main() {
  return (
    <AlertsRenderer.Provider>
      <MyComponent />

      // The root is where rendered content will be appended. Any JSX which can take `children` can be used as the container
      <AlertsRenderer.Root container={<div className="alert-container" />} />
    </AlertsRenderer.Provider>
  )
}

function MyComponent() {
  const render = AlertsRenderer.useImperativeRender()

  return <div>
    <button onClick={() => {
      // We can now render any valid JSX into the Root
      const destroy = render(<span>Alert!</span>)

      // ...and then destroy it programmatically
      setTimeout(destroy, 5000)
    }}>
      Add Alert
    </button>
  </div>
}
```

### Multiple Renderers

```jsx
import { createInstance, createMergedProvider } from '@gapstack/react-imperative-render'

const AlertsRenderer = createInstance()
const ModalRenderer = createInstance()

// imperative-render provides a tiny utility to roll up multiple instances into one Provider component.
// You can use it to prevent mad Context Provider stacks!
const MergedProvider = createMergedProvider([
  AlertsRenderer,
  ModalRenderer
])

function Main() {
  return (
    <MergedProvider>
      <MyComponent />

      // You can now create bespoke containers for different use cases
      <AlertsRenderer.Root container={<div className="alert-container" />} />
      <ModalRenderer.Root container={<div className="modal-container" />} />
    </MergedProvider>
  )
}
```
