import { trpc } from '../trpc'

export function ComplexSuperstruct() {
  const item = trpc.complexSuperstruct.get.useQuery({ id: 1 })
  const items = trpc.complexSuperstruct.list.useQuery({ count: 100 })
  const updateMutation = trpc.complexSuperstruct.update.useMutation()

  if (updateMutation.isLoading) {
    return <div>Mutating</div>
  }

  return (
    <div>
      Complex Zod {item.data?.name} - others: {items.data?.length ?? 'Loading'}
    </div>
  )
}
