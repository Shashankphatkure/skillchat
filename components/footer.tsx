import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      Skillbot powered by with{' '}
      <ExternalLink href="finalproject-drab.vercel.app">Skillconnect</ExternalLink> and{' '}
      <ExternalLink href="https://skillinterview.vercel.app/">
        Skillinterview
      </ExternalLink>
      .
    </p>
  )
}
