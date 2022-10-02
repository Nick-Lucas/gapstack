import {
  createInstance,
  createMergedProvider,
} from '@gapstack/react-imperative-render'

import './multiple-renderers.css'

//
// Create multiple instances and then merge the Providers together

export const AlertsRenderer = createInstance()
export const ModalRenderer = createInstance()

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
  const renderAlert = AlertsRenderer.useImperativeRender()
  const renderModal = ModalRenderer.useImperativeRender()

  return (
    <span className="space">
      <button
        onClick={() => {
          renderAlert((params) => {
            return (
              <div className="alert space">
                <span>Created by click. Will disapear when dismissed</span>

                <button onClick={params.destroy}>Dismiss</button>
              </div>
            )
          })
        }}
      >
        Create dismissable alert
      </button>

      <button
        onClick={() => {
          renderModal((params) => {
            return (
              <div className="modal space">
                <span>Content!</span>

                <button onClick={params.destroy}>Close Modal</button>
              </div>
            )
          })
        }}
      >
        Open a Modal
      </button>
    </span>
  )
}
