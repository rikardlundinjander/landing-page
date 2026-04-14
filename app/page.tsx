'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Panel from '@/components/Panel'

export default function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  // Lock body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isPanelOpen])

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) setIsPanelOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isPanelOpen])

  return (
    <>
      <Hero onOpenPanel={() => setIsPanelOpen(true)} />
      <Footer />

      {/* Overlay — click to close */}
      <div
        className={`overlay${isPanelOpen ? ' active' : ''}`}
        aria-hidden="true"
        onClick={() => setIsPanelOpen(false)}
      />

      <Panel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  )
}
