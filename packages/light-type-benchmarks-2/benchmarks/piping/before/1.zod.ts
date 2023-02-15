import { z } from 'zod'

export const t = z.preprocess(Boolean, z.boolean())
