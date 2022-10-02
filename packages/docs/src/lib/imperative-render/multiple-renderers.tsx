import {
  createInstance,
  createMergedProvider,
} from '@gapstack/react-imperative-render'

import './main.css'

//
// Create multiple instances and then merge the Providers together

type AlertModel = {
  message: string
}
type ModalModel = {
  title: string
  text: string
}

export const AlertsRenderer = createInstance<AlertModel>({
  renderElement: (model, params) => {
    return (
      <div className="alert space">
        <span>{model.message}</span>

        <button onClick={params.destroy}>Dismiss</button>
      </div>
    )
  },
})

export const ModalRenderer = createInstance<ModalModel>({
  renderElement: (model, params) => {
    return (
      <div className="modal space">
        <h4>{model.title}</h4>
        <span>{model.text}</span>

        <button onClick={params.destroy}>Close Modal</button>
      </div>
    )
  },
})

export const MergedRendererProvider = createMergedProvider([
  AlertsRenderer,
  ModalRenderer,
])

//
// Render the Provider and Roots

export default function MultiplerRenderersExample() {
  return (
    <MergedRendererProvider>
      <Component />

      <AlertsRenderer.Root container={<div className="alert-container" />} />
      <ModalRenderer.Root container={<div className="modal-container" />} />
    </MergedRendererProvider>
  )
}

export function Component() {
  const renderAlert = AlertsRenderer.useRender()
  const renderModal = ModalRenderer.useRender()

  return (
    <span className="space">
      <button
        onClick={() => {
          renderAlert({
            message: 'Created by click. Will disapear when dismissed',
          })
        }}
      >
        Create dismissable alert
      </button>

      <button
        onClick={() => {
          renderModal({
            title: 'My Modal',
            text: 'Modal with content',
          })
        }}
      >
        Open a Modal
      </button>
    </span>
  )
}
