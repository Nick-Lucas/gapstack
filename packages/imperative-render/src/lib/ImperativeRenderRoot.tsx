/* eslint-disable react/jsx-no-useless-fragment */

import React, { useContext } from 'react'
import { ImperativeRenderElementsContext } from './Context'

export type ImperativeRenderRootProps = {
  container?: JSX.Element
}

export function ImperativeRenderRoot({
  container = <React.Fragment />,
}: ImperativeRenderRootProps) {
  const elements = useContext(ImperativeRenderElementsContext)

  return React.cloneElement(container, {
    children: Object.keys(elements).map((key) => (
      <React.Fragment key={key}>{elements[key]}</React.Fragment>
    )),
  })
}
