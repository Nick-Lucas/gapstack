import { router } from './trpc'

import { complexLightTypeRouter } from './app/complexLightTypeRouter'
import { complexSuperstructRouter } from './app/complexSuperstructRouter'
import { complexZodRouter } from './app/complexZodRouter'
import { simpleLightTypeRouter } from './app/simpleLightTypeRouter'
import { simpleSuperstructRouter } from './app/simpleSuperstructRouter'
import { simpleZodRouter } from './app/simpleZodRouter'

export const appRouter = router({
  simpleLightType: simpleLightTypeRouter,
  complexLightType: complexLightTypeRouter,
  simpleZod: simpleZodRouter,
  complexZod: complexZodRouter,
  simpleSuperstruct: simpleSuperstructRouter,
  complexSuperstruct: complexSuperstructRouter,
})

export type AppRouter = typeof appRouter
