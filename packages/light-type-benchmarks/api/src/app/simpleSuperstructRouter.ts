import * as s from 'superstruct'
import { publicProcedure, router } from '../trpc'

const PersonDto = s.object({
  id: s.number(),
  firstName: s.string(),
  lastName: s.string(),
  tel: s.optional(s.string()),
})

const CarDto = s.object({
  id: s.number(),
  name: s.string(),
  age: s.number(),
  brand: s.optional(
    s.union([
      s.literal('Volvo'),
      s.literal('Mercedes'),
      s.literal('BMW'),
      s.literal('Ferrari'),
      s.literal('Bazmus'),
    ])
  ),
  previousOwners: s.defaulted(s.array(PersonDto), []),
})

type DbCar = typeof CarDto.TYPE
type Brand = typeof CarDto.TYPE['brand']

export const simpleSuperstructRouter = router({
  list: publicProcedure
    .input(s.object({ count: s.defaulted(s.number(), 100) }))
    .output(s.array(CarDto))
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
    .input(s.object({ id: s.number() }))
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
