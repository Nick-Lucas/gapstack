import { trpc } from '../trpc'

export function SimpleSuperstruct() {
  const item = trpc.simpleSuperstruct.get.useQuery({ id: 1 })
  const items = trpc.simpleSuperstruct.list.useQuery({ count: 3 })
  const updateMutation = trpc.simpleSuperstruct.create.useMutation()

  if (updateMutation.isLoading) {
    return <div>Mutating</div>
  }

  return (
    <div>
      Simple Superstruct {item.data?.name} - others:{' '}
      {items.data?.length ?? 'Loading'}
    </div>
  )
}
