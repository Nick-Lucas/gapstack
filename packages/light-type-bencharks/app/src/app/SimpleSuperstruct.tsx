import { trpc } from '../trpc'

export function SimpleSuperstruct() {
  const item = trpc.simpleSuperstruct.get.useQuery({ id: 1 })
  const items = trpc.simpleSuperstruct.list.useQuery({ count: 100 })
  const updateMutation = trpc.simpleSuperstruct.update.useMutation()

  if (updateMutation.isLoading) {
    return <div>Mutating</div>
  }

  return (
    <div>
      Simple Zod {item.data?.name} - others: {items.data?.length ?? 'Loading'}
    </div>
  )
}
