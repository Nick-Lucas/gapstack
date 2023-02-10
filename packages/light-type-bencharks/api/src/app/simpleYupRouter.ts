/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as y from 'yup'
import { publicProcedure, router } from '../trpc'

const PersonDto = y.object({
  id: y.number(),
  firstName: y.string(),
  lastName: y.string(),
  tel: y.string().optional(),
})

const CarDto = y.object({
  id: y.number(),
  name: y.string(),
  age: y.number(),
  brand: y
    .string() // FIXME: yup seems not to support literal unions at all
    .optional(),
  previousOwners: y.array(PersonDto).default([]),
})

type DbCar = Parameters<typeof CarDto.validate>[0]
type Brand = typeof CarDto.__outputType['brand']

export const simpleYupRouter = router({
  list: publicProcedure
    .input(y.object({ count: y.number().default(100) }))
    .output(y.array(CarDto))
    .query((opts) => {
      return new Array(opts.input.count).map<DbCar>((_, idx) => {
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
    .input(y.object({ id: y.number() }))
    .output(CarDto)
    .query((opts) => {
      return {
        id: opts.input.id,
        name: 'Foobarmo',
        age: 3,
        brand: 'Bazmus' as Brand,
        previousOwners: [
          {
            id: opts.input.id! * 100,
            firstName: 'Bob',
            lastName: 'Owneverythingman',
            tel: undefined,
          },
        ],
      }
    }),
  update: publicProcedure
    .input(CarDto)
    .output(CarDto)
    .mutation((opts) => {
      return opts.input
    }),
})
