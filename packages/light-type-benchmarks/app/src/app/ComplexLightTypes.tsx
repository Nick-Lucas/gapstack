import { trpc } from '../trpc'

export function ComplexLightTypes() {
  const item = trpc.complexLightType.get.useQuery({ id: 1 })
  const items = trpc.complexLightType.list.useQuery({ count: 3 })
  const updateMutation = trpc.complexLightType.create.useMutation()

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
