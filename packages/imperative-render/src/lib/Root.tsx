/* eslint-disable react/jsx-no-useless-fragment */

import React, { ReactNode } from 'react'
import { useInternalRootSubscription, RenderUtils } from './Context'
import { RendererModel } from './types'

export type RootOptions<Model extends RendererModel> = {
  container?: JSX.Element
  renderElement: (model: Model, utils: RenderUtils) => ReactNode
}

export type ImperativeRenderRootProps = {
  //
}

export function createRoot<Model extends RendererModel>(
  rootKey: symbol,
  options: RootOptions<Model>
) {
  return function ImperativeRenderRoot(props: ImperativeRenderRootProps) {
    const items = useInternalRootSubscription<Model>(rootKey)

    if (items.length === 0) {
      return null
    }

    return React.cloneElement(options.container ?? <React.Fragment />, {
      children: items.map((item, index) => (
        <React.Fragment key={index}>
          {options.renderElement(item.model, item.utils)}
        </React.Fragment>
      )),
    })
  }
}
