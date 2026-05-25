import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/** Phone numbers, emails, and IDs — always LTR even when the page is Arabic/RTL. */
export function LtrText({ children, className }: Props) {
  return (
    <span
      dir="ltr"
      lang="en"
      className={['inline-block unicode-bidi-isolate tabular-nums', className].filter(Boolean).join(' ')}
    >
      {children}
    </span>
  )
}
