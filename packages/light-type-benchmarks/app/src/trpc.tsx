/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import React, { ReactNode, useState } from 'react'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../api/src/appRouter'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpLink } from '@trpc/client'

export const trpc = createTRPCReact<AppRouter>()

export function TrpcProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          url: 'http://localhost:3333',
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
