import { z } from 'zod'

export const t = z.unknown().transform(Boolean)
