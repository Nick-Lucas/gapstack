import {
  createInstance,
  ImperativeRenderProvider,
} from '@gapstack/react-imperative-render'

import './main.css'

type AlertModel = {
  variant: 'info' | 'positive' | 'negative'
  message: string
}

const AlertsRenderer = createInstance<AlertModel>({
  container: <div className="alert-container" />,
  renderElement: (model, params) => {
    let icon = '⏰'
    let bg = '#9999ff'
    switch (model.variant) {
      case 'positive': {
        icon = '👍'
        bg = '#99dd99'
        break
      }
      case 'negative': {
        icon = '👎'
        bg = '#dd9999'
      }
    }

    return (
      <div className="alert space" style={{ backgroundColor: bg }}>
        <span>{icon}</span>
        <span>{model.message}</span>
      </div>
    )
  },
})

export default function PromiseProgressExample() {
  return (
    <ImperativeRenderProvider>
      <Component />

      <AlertsRenderer.Root />
    </ImperativeRenderProvider>
  )
}

export function Component() {
  const renderBriefly = AlertsRenderer.useTimed({
    timeout: 1000,
  })
  const renderForPromise = AlertsRenderer.usePromise()

  const getCallback = (callPromise: () => Promise<number>) => {
    return async () => {
      try {
        const randomNumber: number = await renderForPromise(
          { variant: 'info', message: 'Working, please wait...' },
          callPromise()
        )

        renderBriefly({
          variant: 'positive',
          message: `Task succeeded, got random number: ${randomNumber}`,
        })
      } catch (error) {
        renderBriefly({
          variant: 'negative',
          message: `Task failed with error: ${error}`,
        })
      }
    }
  }

  return (
    <span className="space">
      <button onClick={getCallback(getSuccessfulRandomNumberPromise)}>
        Successful Promise
      </button>

      <button onClick={getCallback(getFailingRandomNumberPromise)}>
        Failing Promise
      </button>
    </span>
  )
}

async function getSuccessfulRandomNumberPromise() {
  return await new Promise<number>((resolve) =>
    setTimeout(() => resolve(Math.floor(Math.random() * 100)), 1000)
  )
}

async function getFailingRandomNumberPromise() {
  return await new Promise<number>((resolve, reject) =>
    setTimeout(
      () => reject('Failed with code ' + Math.floor(Math.random() * 100)),
      1000
    )
  )
}
