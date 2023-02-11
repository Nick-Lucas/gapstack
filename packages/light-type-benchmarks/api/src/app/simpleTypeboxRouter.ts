import { TypeCompiler } from '@sinclair/typebox/compiler'
import { Type as t, Static, TSchema } from '@sinclair/typebox'
import { publicProcedure, router } from '../trpc'

// Borrowed from: https://github.com/trpc/trpc/issues/2453#issuecomment-1269584140
export function Compile<T extends TSchema>(
  schema: T,
  references: TSchema[] = []
) {
  const check = TypeCompiler.Compile(schema, references)
  return (input: unknown) => {
    if (check.Check(input)) return input
    throw Error('Invalid Input')
  }
}

const PersonDto = t.Object({
  id: t.Number(),
  firstName: t.String(),
  lastName: t.String(),
  tel: t.Optional(t.String()),
})

const CarDto = t.Object({
  id: t.Number(),
  name: t.String(),
  age: t.Number(),
  brand: t.Optional(
    t.Union([
      t.Literal('Volvo'),
      t.Literal('Mercedes'),
      t.Literal('BMW'),
      t.Literal('Ferrari'),
      t.Literal('Bazmus'),
    ])
  ),
  previousOwners: t.Array(PersonDto, { default: [] }),
})

type DbCar = Static<typeof CarDto>
type Brand = Static<typeof CarDto>['brand']

export const simpleTypeboxRouter = router({
  list: publicProcedure
    .input(Compile(t.Object({ count: t.Number({ default: 100 }) })))
    .output(Compile(t.Array(CarDto)))
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
    .input(Compile(t.Object({ id: t.Number() })))
    .output(Compile(CarDto))
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
    .input(Compile(CarDto))
    .output(Compile(CarDto))
    .mutation((opts) => {
      return opts.input as DbCar
    }),
})
