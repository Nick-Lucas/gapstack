import { trpc } from '../trpc'

export function LightTypes() {
  const items = trpc.simpleLightType.list.useQuery({ count: 100 })

  return <div>Light types {items.data?.length ?? 'Loading'}</div>
}
