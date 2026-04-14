'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Panel.module.css'

interface PanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function Panel({ isOpen, onClose }: PanelProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [terms, setTerms]         = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const isValid = firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && terms

  // Focus close button when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeBtnRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Reset form after panel closes (after animation)
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setTerms(false)
        setSubmitted(false)
      }, 400)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) setSubmitted(true)
  }

  return (
    <aside
      className={`${styles.panel}${isOpen ? ` ${styles.open}` : ''}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
    >
      {/* Header with close button */}
      <div className={styles.header}>
        <button
          ref={closeBtnRef}
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close panel"
          tabIndex={isOpen ? 0 : -1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <path d="M6 6L18 18" stroke="white" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.body}>

        {/* ── Form state ─────────────────────── */}
        {!submitted && (
          <div>
            <div className={styles.titleGroup}>
              <p className={styles.label}>Newsletter</p>
              <h2 className={styles.heading}>Sign up for Updates</h2>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.fields}>

                <div className={styles.inputWrap}>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    tabIndex={isOpen ? 0 : -1}
                  />
                </div>

                <div className={styles.inputWrap}>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    tabIndex={isOpen ? 0 : -1}
                  />
                </div>

                <div className={styles.inputWrap}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    tabIndex={isOpen ? 0 : -1}
                  />
                </div>

                <div className={`${styles.inputWrap} ${styles.checkboxWrap}`}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={terms}
                      onChange={e => setTerms(e.target.checked)}
                      required
                      tabIndex={isOpen ? 0 : -1}
                    />
                    <span className={styles.checkboxBox} aria-hidden="true" />
                    <span className={styles.checkboxText}>
                      I agree to the Specs{' '}
                      <a href="#" tabIndex={isOpen ? 0 : -1}>Terms and Conditions</a>{' '}
                      and confirm that I have read and understood the{' '}
                      <a href="#" tabIndex={isOpen ? 0 : -1}>Privacy Policy</a>.
                    </span>
                  </label>
                </div>

              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!isValid}
                aria-disabled={!isValid}
                tabIndex={isOpen ? 0 : -1}
              >
                Sign up
              </button>
            </form>
          </div>
        )}

        {/* ── Confirmation state ─────────────── */}
        {submitted && (
          <div className={styles.confirm} aria-live="polite">
            <div className={styles.titleGroup}>
              <p className={styles.label}>Newsletter</p>
              <h2 className={styles.heading}>
                Thanks {firstName}!<br />
                You&apos;re signed up for updates.
              </h2>
            </div>
          </div>
        )}

      </div>
    </aside>
  )
}
