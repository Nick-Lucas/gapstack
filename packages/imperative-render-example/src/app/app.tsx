import './app.css'
import { AlertsRenderer, ModalRenderer } from './imperative-renderers'

export function App() {
  const render = AlertsRenderer.useImperativeRender()
  const renderModal = ModalRenderer.useImperativeRender()

  return (
    <div>
      <h1>React Imperative Render</h1>
      <p>
        Render elements in-line during callbacks and effects, for instance when
        awaiting a promise and wanting to give quick updates on progress or
        errors
      </p>

      <span className="space">
        {/* Render something and later destroy it */}
        <button
          onClick={async () => {
            const destroy = render(
              <div className="alert">
                Created by click. Will disapear when a promise resolves
              </div>
            )

            await new Promise((resolve) => setTimeout(resolve, 1000))

            destroy()

            const destroySuccess = render(<div className="alert">Success!</div>)
            setTimeout(destroySuccess, 500)
          }}
        >
          Create alert for promise
        </button>

        {/* Render something which can destroy itself */}
        <button
          onClick={() => {
            render((params) => (
              <div className="alert space">
                <span>Created by click. Will disapear when dismissed</span>

                <button onClick={params.destroy}>Dismiss</button>
              </div>
            ))
          }}
        >
          Create closeable alert
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
          Create a modal element with its own parent layout
        </button>
      </span>
    </div>
  )
}
