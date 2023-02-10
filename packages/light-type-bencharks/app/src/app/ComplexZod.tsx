import { trpc } from '../trpc'

export function ComplexZod() {
  const item = trpc.complexZod.get.useQuery({ id: 1 })
  const items = trpc.complexZod.list.useQuery({ count: 100 })
  const updateMutation = trpc.complexZod.update.useMutation()

  if (updateMutation.isLoading) {
    return <div>Mutating</div>
  }

  return (
    <div>
      Complex Zod {item.data?.name} - others: {items.data?.length ?? 'Loading'}
    </div>
  )
}
