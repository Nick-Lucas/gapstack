import { router } from './trpc'

import { complexLightTypeRouter } from './app/complexLightTypeRouter'
import { complexSuperstructRouter } from './app/complexSuperstructRouter'
import { complexZodRouter } from './app/complexZodRouter'
import { simpleLightTypeRouter } from './app/simpleLightTypeRouter'
import { simpleSuperstructRouter } from './app/simpleSuperstructRouter'
import { simpleZodRouter } from './app/simpleZodRouter'
import { simpleYupRouter } from './app/simpleYupRouter'
import { simpleTypeboxRouter } from './app/simpleTypeboxRouter'
import { complexTypeboxRouter } from './app/complexTypeboxRouter'

export const appRouter = router({
  simpleLightType: simpleLightTypeRouter,
  complexLightType: complexLightTypeRouter,
  simpleZod: simpleZodRouter,
  complexZod: complexZodRouter,
  simpleSuperstruct: simpleSuperstructRouter,
  complexSuperstruct: complexSuperstructRouter,
  simpleYup: simpleYupRouter,
  simpleTypebox: simpleTypeboxRouter,
  complexTypebox: complexTypeboxRouter,
})

export type AppRouter = typeof appRouter
