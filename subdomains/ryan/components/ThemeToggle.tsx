import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import styles from './ThemeToggle.module.css'
import {
  applyTheme,
  getServerTheme,
  getStoredTheme,
  storeTheme,
  subscribeTheme,
  type Theme,
} from '@/lib/theme'

const OPTIONS: Array<{ value: Theme; label: string }> = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

// Below this scroll offset the toggle always shows, so it doesn't
// flicker away from tiny scrolls (mobile bounce, sub-pixel jitter) right
// at the top of the page.
const ALWAYS_VISIBLE_BELOW_Y = 8
// Minimum scroll delta (in either direction) before we react, so a resting
// thumb or trackpad jitter can't toggle visibility on its own.
const DIRECTION_THRESHOLD = 4

export default function ThemeToggle() {
  // The server (and first client render, for hydration) always see
  // 'system'; useSyncExternalStore then swaps in the real saved preference
  // — including a preference changed in another tab via the 'storage'
  // event (see subscribeTheme).
  const theme = useSyncExternalStore(subscribeTheme, getStoredTheme, getServerTheme)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  // Keep the DOM in sync with `theme` from any source — a click below, or
  // a change made in another tab. Reapplying the already-current theme
  // (e.g. right after hydration) is a harmless no-op.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Hide the toggle while scrolling down (it would otherwise sit over page
  // content) and bring it back on scroll up or near the top.
  useEffect(() => {
    lastScrollY.current = window.scrollY

    function onScroll() {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      if (y <= ALWAYS_VISIBLE_BELOW_Y) {
        setHidden(false)
      } else if (delta > DIRECTION_THRESHOLD) {
        setHidden(true)
      } else if (delta < -DIRECTION_THRESHOLD) {
        setHidden(false)
      }
      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function choose(next: Theme) {
    storeTheme(next)
  }

  return (
    // A fixed-position control sitting outside the page's <main> needs its
    // own landmark, or axe's "region" check flags it as content unreachable
    // via landmark navigation — hence the wrapping role="region". `inert`
    // while hidden drops it from the tab order and hit-testing, so it can't
    // trap keyboard focus or clicks while off-screen.
    <div
      className={hidden ? `${styles.toggle} ${styles.hidden}` : styles.toggle}
      role="region"
      aria-label="Theme"
      inert={hidden || undefined}
    >
      <div className={styles.group} role="radiogroup" aria-label="Color theme">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={theme === option.value}
            className={theme === option.value ? styles.active : undefined}
            onClick={() => choose(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
