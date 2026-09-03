import { useEffect, useSyncExternalStore } from 'react'
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

export default function ThemeToggle() {
  // The server (and first client render, for hydration) always see
  // 'system'; useSyncExternalStore then swaps in the real saved preference
  // — including a preference changed in another tab via the 'storage'
  // event (see subscribeTheme).
  const theme = useSyncExternalStore(subscribeTheme, getStoredTheme, getServerTheme)

  // Keep the DOM in sync with `theme` from any source — a click below, or
  // a change made in another tab. Reapplying the already-current theme
  // (e.g. right after hydration) is a harmless no-op.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function choose(next: Theme) {
    storeTheme(next)
  }

  return (
    <div className={styles.toggle} role="radiogroup" aria-label="Color theme">
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
  )
}
