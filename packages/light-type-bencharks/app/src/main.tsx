import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { TrpcProviders } from './trpc'

import { SimpleLightTypes } from './app/SimpleLightTypes'
import { ComplexLightTypes } from './app/ComplexLightTypes'
import { SimpleZod } from './app/SimpleZod'
import { ComplexZod } from './app/ComplexZod'
import { SimpleSuperstruct } from './app/SimpleSuperstruct'
import { ComplexSuperstruct } from './app/ComplexSuperstruct'
import { SimpleTypebox } from './app/SimpleTypebox'
import { ComplexTypebox } from './app/ComplexTypebox'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <TrpcProviders>
      <div>
        <SimpleLightTypes />
        <ComplexLightTypes />

        <SimpleZod />
        <ComplexZod />

        <SimpleSuperstruct />
        <ComplexSuperstruct />

        <SimpleTypebox />
        <ComplexTypebox />
      </div>
    </TrpcProviders>
  </StrictMode>
)
