import { useSyncExternalStore } from 'react'
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
  // 'system'; useSyncExternalStore then swaps in the real saved preference.
  const theme = useSyncExternalStore(subscribeTheme, getStoredTheme, getServerTheme)

  function choose(next: Theme) {
    storeTheme(next)
    applyTheme(next)
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
