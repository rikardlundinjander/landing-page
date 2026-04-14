import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bar}>

        <div className={styles.barTop}>
          <div className={styles.legal}>
            <a href="#">User Agreement</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        <div className={styles.barBottom}>
          <span className={styles.copyright}>© 2026 Specs Inc. All Rights Reserved.</span>
          <div className={styles.language}>
            <span>Language</span>
            <button className={styles.languageBtn} aria-label="Select language">
              English (US)
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
