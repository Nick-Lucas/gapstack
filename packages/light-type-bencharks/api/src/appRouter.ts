import { complexLightTypeRouter } from './app/complexLightTypeRouter'
import { complexZodRouter } from './app/complexZodRouter'
import { simpleLightTypeRouter } from './app/simpleLightTypeRouter'
import { simpleSuperstructRouter } from './app/simpleSuperstructRouter'
import { simpleZodRouter } from './app/simpleZodRouter'
import { router } from './trpc'

export const appRouter = router({
  simpleLightType: simpleLightTypeRouter,
  complexLightType: complexLightTypeRouter,
  simpleZod: simpleZodRouter,
  complexZod: complexZodRouter,
  simpleSuperstruct: simpleSuperstructRouter,
})

export type AppRouter = typeof appRouter
