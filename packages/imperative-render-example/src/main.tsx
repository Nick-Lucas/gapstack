import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  AlertsRenderer,
  ModalRenderer,
  ImperativeRenderProvider,
} from './app/imperative-renderers'

import { App } from './app/app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <ImperativeRenderProvider>
      <App />

      <AlertsRenderer.Root container={<div className="alert-container" />} />
      <ModalRenderer.Root container={<div className="modal-container" />} />
    </ImperativeRenderProvider>
  </StrictMode>
)
