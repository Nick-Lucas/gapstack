import { createInstance, Instance } from '.'

import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

describe('imperative-render', () => {
  it('checks testing-library is set up', async () => {
    render(<div>Hello world</div>)

    screen.getByText('Hello world')
  })

  describe('createInstance', () => {
    function doRender(instance: Instance, Component: React.FC) {
      return render(
        <instance.Provider>
          <Component />
        </instance.Provider>
      )
    }

    it('renders "Jim" in a span', async () => {
      const instance = createInstance()

      function App() {
        const imperativeRender = instance.useImperativeRender()

        return (
          <>
            <div data-testid="app">
              <button
                onClick={() => {
                  imperativeRender(<span>Jim</span>)
                }}
              >
                Make Element
              </button>
            </div>

            <instance.Root
              container={<div data-testid="root-container"></div>}
            />
          </>
        )
      }
      const app = doRender(instance, App)

      const button = app.getByText('Make Element')
      await act(async () => {
        await userEvent.click(button)
      })

      app.getByTestId('root-container')
    })

    it('renders no container element when no render requests have occured', async () => {
      const instance = createInstance()

      function App() {
        return (
          <>
            <instance.Root
              container={<div data-testid="root-container"></div>}
            />
          </>
        )
      }
      const app = doRender(instance, App)

      expect(() => app.getByTestId('root-container')).toThrow()
    })

    it('is stable when no Root element has been rendered', async () => {
      const instance = createInstance()

      function App() {
        const imperativeRender = instance.useImperativeRender()

        return (
          <>
            <div data-testid="app">
              <button
                onClick={() => {
                  imperativeRender(<span>Jim</span>)
                }}
              >
                Make Element
              </button>
            </div>
          </>
        )
      }
      const app = doRender(instance, App)

      const button = app.getByText('Make Element')
      await act(async () => {
        await userEvent.click(button)
      })

      expect(() => app.getByTestId('root-container')).toThrow()
    })
  })
})
