import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

const PersonDto = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  tel: z.string().optional(),
})

const CarDto = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  brand: z
    .union([
      z.literal('Volvo'),
      z.literal('Mercedes'),
      z.literal('BMW'),
      z.literal('Ferrari'),
      z.literal('Bazmus'),
    ])
    .optional(),
  previousOwners: z.array(PersonDto).default([]),
})

type DbCar = typeof CarDto['_input']
type Brand = typeof CarDto['_output']['brand']

export const simpleZodRouter = router({
  list: publicProcedure
    .input(z.object({ count: z.number().default(100) }))
    .output(z.array(CarDto))
    .query((opts) => {
      return new Array(opts.input.count).fill(null).map<DbCar>((_, idx) => {
        return {
          id: idx,
          name: 'Foobarmo',
          age: 3,
          brand: 'Bazmus' as Brand,
          previousOwners: [
            {
              id: idx * 100,
              firstName: 'Bob',
              lastName: 'Owneverythingman',
              tel: undefined,
            },
          ],
        }
      })
    }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .output(CarDto)
    .query((opts) => {
      return {
        id: opts.input.id,
        name: 'Foobarmo',
        age: 3,
        brand: 'Bazmus' as Brand,
        previousOwners: [
          {
            id: opts.input.id * 100,
            firstName: 'Bob',
            lastName: 'Owneverythingman',
            tel: undefined,
          },
        ],
      }
    }),
  create: publicProcedure
    .input(CarDto)
    .output(CarDto)
    .mutation((opts) => {
      return opts.input as DbCar
    }),
})
