import { createInstance } from '@gapstack/react-imperative-render'

import './main.css'

type ConfirmationModel = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export const Renderer = createInstance<ConfirmationModel>({
  renderElement: (model, params) => {
    return (
      <div className="alert space">
        <span>{model.message}</span>

        <span>
          <button onClick={model.onConfirm} className="positive">
            Continue
          </button>
          <button onClick={model.onCancel} className="negative">
            Cancel
          </button>
        </span>
      </div>
    )
  },
})

export default function ConfirmationExample() {
  return (
    <Renderer.Provider>
      <Component />

      <Renderer.Root container={<div className="alert-container" />} />
    </Renderer.Provider>
  )
}

export function Component() {
  const renderAlert = Renderer.useRender()

  return (
    <button
      onClick={async () => {
        await prepareDangerousChange()

        const confirmed = await new Promise<boolean>((resolve) => {
          renderAlert((params) => {
            return {
              message: 'Dangerous change will take place. Continue?',
              onConfirm() {
                resolve(true)
                params.destroy()
              },
              onCancel() {
                resolve(false)
                params.destroy()
              },
            }
          })
        })

        if (!confirmed) {
          await abandonDangerousChange()
          return
        }

        await applyDangerousChange()
      }}
    >
      Start Operation
    </button>
  )
}

async function prepareDangerousChange() {
  //
}
async function applyDangerousChange() {
  //
}
async function abandonDangerousChange() {
  //
}
