import { trpc } from '../trpc'

export function SimpleYup() {
  const item = trpc.simpleYup.get.useQuery({ id: 1 })
  const items = trpc.simpleYup.list.useQuery({ count: 100 })
  const updateMutation = trpc.simpleYup.update.useMutation()

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
