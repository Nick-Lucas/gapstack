/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { Meta } from '@storybook/react'
import { make } from './helpers'

import BasicExample from './imperative-render/basic'
import BasicExampleRaw from '!!raw-loader!./imperative-render/basic'
import MultipleRenderersExample from './imperative-render/multiple-renderers'
import MultipleRenderersExampleRaw from '!!raw-loader!./imperative-render/multiple-renderers'
import CloseSelfExample from './imperative-render/close-self'
import CloseSelfExampleRaw from '!!raw-loader!./imperative-render/close-self'
import TimedExample from './imperative-render/timed'
import TimedExampleRaw from '!!raw-loader!./imperative-render/timed'
import ConfirmationExample from './imperative-render/confirmation-dialogue'
import ConfirmationExampleRaw from '!!raw-loader!./imperative-render/confirmation-dialogue'

const meta: Meta = {
  title: 'React Imperative Render',
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
  },
}
export default meta

export const Basic = make(BasicExample, BasicExampleRaw, {
  title: 'Basic Usage',
  description: (
    <>
      <>
        React Imperative Render is useful to manage information delivery and
        interactions as part of a callback or effect.
      </>

      <p>
        Here we add an item to a list from a button click, and later destroy it
        automatically. You can imagine this being useful for creating your own
        Toast notifications or UI feedback while awaiting a Promise.
      </p>
    </>
  ),
})

export const Timed = make(TimedExample, TimedExampleRaw, {
  title: 'Timed Render',
  description: (
    <>
      You don't have to add a setTimeout yourself. There are dedicated hooks for
      common use cases.
    </>
  ),
})

export const Confirmation = make(ConfirmationExample, ConfirmationExampleRaw, {
  title: 'Confirmation Dialogue',
  description: (
    <>
      You can wrap the dialogue up in a Promise to await a user response, for
      instance for some confirmation of a dangerous operation.
    </>
  ),
})

export const CloseSelf = make(CloseSelfExample, CloseSelfExampleRaw, {
  title: 'Closeable Elements',
  description: (
    <>
      The Render function can take a callback which provides useful params to
      the content, for instance to add a dismiss button. Here the destroy()
      param is used to close the element on dismiss.
    </>
  ),
})

export const MultipleRenderers = make(
  MultipleRenderersExample,
  MultipleRenderersExampleRaw,
  {
    title: 'Multiple Renderers',
    description: (
      <>
        Multiple Renderer instances can be used in parallel to support
        differenct HTML/CSS needs. Here we have a simple Toast notification
        instance alongside a Modal instance.
      </>
    ),
  }
)
