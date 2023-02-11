import { trpc } from '../trpc'

export function SimpleLightTypes() {
  const item = trpc.simpleLightType.get.useQuery({ id: 1 })
  const items = trpc.simpleLightType.list.useQuery({ count: 3 })
  const updateMutation = trpc.simpleLightType.create.useMutation()

  if (updateMutation.isLoading) {
    return <div>Mutating</div>
  }

  return (
    <div>
      Simple Light Types {item.data?.name} - others:{' '}
      {items.data?.length ?? 'Loading'}
    </div>
  )
}
