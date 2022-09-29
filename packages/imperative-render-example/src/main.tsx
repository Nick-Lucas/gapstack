import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  ImperativeRenderProvider,
  ImperativeRenderRoot,
} from '@reactils/imperative-render'

import { App } from './app/app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <ImperativeRenderProvider>
      <App />

      <ImperativeRenderRoot />
    </ImperativeRenderProvider>
  </StrictMode>
)
