import { lt } from '@gapstack/light-type'
import { publicProcedure, router } from '../trpc'

const EntityDto = lt.object({
  id: lt.number(),
})

const PersonDto = EntityDto.extend({
  firstName: lt.string(),
  lastName: lt.string(),
  tel: lt.string().optional(),
})

const CarDto = EntityDto.extend({
  id: lt.number(),
  name: lt.string(),
  age: lt.number(),
  brand: lt
    .literal(['Volvo', 'Mercedes', 'BMW', 'Ferrari', 'Bazmus'] as const)
    .optional(),
  previousOwners: lt.array(PersonDto).default([]),
})

type DbCar = typeof CarDto['_input']
type Brand = typeof CarDto['_output']['brand']

export const complexLightTypeRouter = router({
  list: publicProcedure
    .input(lt.object({ count: lt.number().default(100) }))
    .output(lt.array(CarDto))
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
    .input(lt.object({ id: lt.number() }))
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
  update: publicProcedure
    .input(CarDto.omit({ id: true }))
    .output(CarDto)
    .mutation((opts) => {
      return opts.input as DbCar
    }),
})
