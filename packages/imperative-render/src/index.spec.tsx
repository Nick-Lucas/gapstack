import { createInstance, Instance, ImperativeRenderProvider } from '.'

import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { RendererModel } from './lib/types'

describe('imperative-render', () => {
  it('checks testing-library is set up', async () => {
    render(<div>Hello world</div>)

    screen.getByText('Hello world')
  })

  describe('createInstance', () => {
    type NameModel = { name: string }

    function doRender<Model extends RendererModel>(
      instance: Instance<Model>,
      Component: React.FC
    ) {
      return render(
        <ImperativeRenderProvider>
          <Component />
        </ImperativeRenderProvider>
      )
    }

    it('renders "Jim" in a span', async () => {
      const instance = createInstance<NameModel>({
        container: <div data-testid="root-container" />,
        renderElement: (model, params) => {
          return <span>{model.name}</span>
        },
      })

      function App() {
        const imperativeRender = instance.useRender()

        return (
          <>
            <div data-testid="app">
              <button
                onClick={() => {
                  imperativeRender({
                    name: 'Jim',
                  })
                }}
              >
                Make Element
              </button>
            </div>

            <instance.Root />
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
      const instance = createInstance({
        container: <div data-testid="root-container" />,
        renderElement: () => {
          throw new Error('NOT_IMPLEMENTED')
        },
      })

      function App() {
        return (
          <>
            <instance.Root />
          </>
        )
      }
      const app = doRender(instance, App)

      expect(() => app.getByTestId('root-container')).toThrow()
    })

    it('is stable when no Root element has been rendered', async () => {
      const instance = createInstance<NameModel>({
        container: <div data-testid="root-container" />,
        renderElement: (model, params) => {
          return <span>{model.name}</span>
        },
      })

      function App() {
        const imperativeRender = instance.useRender()

        return (
          <>
            <div data-testid="app">
              <button
                onClick={() => {
                  imperativeRender({
                    name: 'Jim',
                  })
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
