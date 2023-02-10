import { complexZodRouter } from './app/complexZodRouter'
import { simpleLightTypeRouter } from './app/simpleLightTypeRouter'
import { simpleZodRouter } from './app/simpleZodRouter'
import { router } from './trpc'

export const appRouter = router({
  simpleLightType: simpleLightTypeRouter,
  simpleZod: simpleZodRouter,
  complexZod: complexZodRouter,
})

export type AppRouter = typeof appRouter
