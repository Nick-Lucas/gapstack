import { simpleLightTypeRouter } from './app/simpleLightTypeRouter'
import { router } from './trpc'

export const appRouter = router({
  simpleLightType: simpleLightTypeRouter,
})

export type AppRouter = typeof appRouter
