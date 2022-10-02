/* eslint-disable react/jsx-no-useless-fragment */

import React, { useContext } from 'react'
import { Contexts } from './Context'
import { RendererModel } from './types'

export type ImperativeRenderRootProps = {
  container?: JSX.Element
}

export function createRoot<Model extends RendererModel>(
  contexts: Contexts<Model>
) {
  return function ImperativeRenderRoot({
    container = <React.Fragment />,
  }: ImperativeRenderRootProps) {
    const elements = useContext(contexts.Elements)

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
