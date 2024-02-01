import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Interested in technology trends?',
    message: `What is a "serverless function"?`
  },
  {
    heading: 'Help in learning programming language',
    message: 'what is objects in javascript?'
  },
  {
    heading: 'Looking for book suggestions',
    message: `Book suggestions for learning React.js`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to Skillconnect's AI Chatbot! Skillchat
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          we can bring the benefits of one-on-one tutoring—deep understanding, confidence, clarity, and empowerment built with{' '}
          <ExternalLink href="https://finalproject-drab.vercel.app/">Skillconnect</ExternalLink> by{' '}
          <ExternalLink href="https://finalproject-drab.vercel.app/team">
            Development team
          </ExternalLink>
          .
        </p>
        <br/>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
