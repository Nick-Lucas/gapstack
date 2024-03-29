import { trpc } from '../trpc'

export function SimpleTypebox() {
  const item = trpc.simpleTypebox.get.useQuery({ id: 1 })
  const items = trpc.simpleTypebox.list.useQuery({ count: 3 })
  const updateMutation = trpc.simpleTypebox.create.useMutation()

  if (updateMutation.isLoading) {
    return <div>Mutating</div>
  }

  return (
    <div>
      Simple Typebox {item.data?.name} - others:{' '}
      {items.data?.length ?? 'Loading'}
    </div>
  )
}
