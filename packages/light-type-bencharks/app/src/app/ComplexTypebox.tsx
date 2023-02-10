import { trpc } from '../trpc'

export function ComplexTypebox() {
  const item = trpc.complexTypebox.get.useQuery({ id: 1 })
  const items = trpc.complexTypebox.list.useQuery({ count: 3 })
  const updateMutation = trpc.complexTypebox.update.useMutation()

  if (updateMutation.isLoading) {
    return <div>Mutating</div>
  }

  return (
    <div>
      Simple Zod {item.data?.name} - others: {items.data?.length ?? 'Loading'}
    </div>
  )
}
