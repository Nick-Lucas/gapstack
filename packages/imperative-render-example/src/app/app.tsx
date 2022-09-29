import './app.css'
import { useImperativeRender } from '@reactils/imperative-render'

export function App() {
  const render = useImperativeRender()

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
              <div className="modal">
                Created by click. Will disapear when a promise resolves
              </div>
            )

            await new Promise((resolve) => setTimeout(resolve, 1000))

            destroy()

            const destroySuccess = render(<div className="modal">Success!</div>)
            setTimeout(destroySuccess, 500)
          }}
        >
          Create element for promise
        </button>

        {/* Render something which can destroy itself */}
        <button
          onClick={() => [
            render((params) => (
              <div className="modal space">
                <span>Created by click. Will disapear when dismissed</span>

                <button onClick={params.destroy}>Dismiss</button>
              </div>
            )),
          ]}
        >
          Create closeable element
        </button>
      </span>
    </div>
  )
}
