import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LightTypes } from './app/LightTypes'
import { TrpcProviders } from './trpc'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <TrpcProviders>
      <div>
        <LightTypes />
      </div>
    </TrpcProviders>
  </StrictMode>
)
