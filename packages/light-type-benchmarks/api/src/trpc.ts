import { initTRPC } from '@trpc/server'

const t = initTRPC.create({
  errorFormatter: (err) => {
    return err.shape
  },
})

export const router = t.router

export const publicProcedure = t.procedure
