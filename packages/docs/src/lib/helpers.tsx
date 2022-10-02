import { ReactNode } from 'react'
import { Story } from '@storybook/react'
import { Source } from '@storybook/addon-docs'

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

        <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '1rem' }}>
          <Source dark code={code as string} language="tsx" />
        </div>
      </div>
    )
  }

  story.storyName = opts.title
  story.parameters = {
    title: opts.title,
    docs: {
      title: opts.title,
      source: {
        code: null,
        language: 'tsx',
        type: 'auto',
      },
    },
  }

  return story
}
