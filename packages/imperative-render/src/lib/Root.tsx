/* eslint-disable react/jsx-no-useless-fragment */

import React, { useContext } from 'react'
import { Contexts } from './Context'
import { RendererModel } from './types'

export type RootOptions = {
  container?: JSX.Element
}

export type ImperativeRenderRootProps = {
  //
}

export function createRoot<Model extends RendererModel>(
  contexts: Contexts<Model>,
  options: RootOptions
) {
  return function ImperativeRenderRoot(props: ImperativeRenderRootProps) {
    const elements = useContext(contexts.Elements)
    const container = options.container ?? <React.Fragment />

    if (Object.keys(elements).length === 0) {
      return null
    }

    return React.cloneElement(container, {
      children: Object.keys(elements).map((key) => (
        <React.Fragment key={key}>{elements[key]}</React.Fragment>
      )),
    })
  }
}
