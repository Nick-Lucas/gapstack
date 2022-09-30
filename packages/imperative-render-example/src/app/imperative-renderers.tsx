import {
  createInstance,
  createMergedProvider,
} from '@gapstack/react-imperative-render'

export const AlertsRenderer = createInstance()
export const ModalRenderer = createInstance()

export const ImperativeRenderProvider = createMergedProvider([
  AlertsRenderer,
  ModalRenderer,
])
