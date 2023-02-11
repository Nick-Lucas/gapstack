import { trpc } from '../trpc'

export function SimpleZod() {
  const item = trpc.simpleZod.get.useQuery({ id: 1 })
  const items = trpc.simpleZod.list.useQuery({ count: 3 })
  const updateMutation = trpc.simpleZod.create.useMutation()

  if (updateMutation.isLoading) {
    return <div>Mutating</div>
  }

  return (
    <div>
      Simple Zod {item.data?.name} - others: {items.data?.length ?? 'Loading'}
    </div>
  )
}
