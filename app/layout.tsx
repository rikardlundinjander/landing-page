import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Specs',
  description: 'Sign up for updates from Specs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
