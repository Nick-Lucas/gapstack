import {
  createInstance,
  createMergedProvider,
} from '@reactils/imperative-render'

export const AlertsRenderer = createInstance()
export const ModalRenderer = createInstance()

export const ImperativeRenderProvider = createMergedProvider([
  AlertsRenderer,
  ModalRenderer,
])
