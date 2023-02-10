import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { ComplexZod } from './app/ComplexZod'
import { SimpleLightTypes } from './app/SimpleLightTypes'
import { SimpleZod } from './app/SimpleZod'
import { TrpcProviders } from './trpc'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <TrpcProviders>
      <div>
        <SimpleLightTypes />
        <SimpleZod />
        <ComplexZod />
      </div>
    </TrpcProviders>
  </StrictMode>
)
