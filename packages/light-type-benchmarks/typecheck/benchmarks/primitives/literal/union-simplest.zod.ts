import { z } from 'zod'

export const t = z.union([
  z.literal('Volvo'),
  z.literal('Mercedes'),
  z.literal('BMW'),
  z.literal('Ferrari'),
  z.literal('Bazmus'),
])
