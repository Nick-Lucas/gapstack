import { ReactNode } from 'react'
import { Story } from '@storybook/react'

type MakeOpts = {
  title: string
  description: ReactNode
}

export function make(
  Component: () => JSX.Element,
  code: unknown,
  opts: MakeOpts
) {
  const story: Story = () => {
    return (
      <div>
        <p style={{ marginTop: 0 }}>{opts.description}</p>

        <Component />
      </div>
    )
  }

  story.storyName = opts.title
  story.parameters = {
    title: opts.title,
    docs: {
      title: opts.title,
      source: {
        code: code,
        language: 'tsx',
        type: 'auto',
      },
    },
  }

  return story
}
