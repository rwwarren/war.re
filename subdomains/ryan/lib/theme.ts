export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'
const listeners = new Set<() => void>()

function isTheme(value: unknown): value is 'light' | 'dark' {
  return value === 'light' || value === 'dark'
}

// Returns the user's saved preference, or 'system' if none was saved (the
// default). Safe to call during server rendering — returns 'system'.
export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return isTheme(value) ? value : 'system'
  } catch {
    // localStorage can throw (private browsing, disabled storage, etc).
    return 'system'
  }
}

// A stable 'system' snapshot for server rendering / hydration, so
// useSyncExternalStore never sees a value that could mismatch the markup
// the server produced.
export function getServerTheme(): Theme {
  return 'system'
}

export function storeTheme(theme: Theme): void {
  try {
    if (theme === 'system') {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, theme)
    }
  } catch {
    // Ignore — the theme still applies for this page load via applyTheme.
  }
  listeners.forEach((listener) => listener())
}

// Reflects the chosen theme onto the document so CSS can key off it. Leaving
// the attribute unset for 'system' lets the existing prefers-color-scheme
// media queries keep driving the look.
export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  if (theme === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
}

// For useSyncExternalStore: notifies on our own writes (storeTheme) and on
// writes from other tabs (the native 'storage' event).
export function subscribeTheme(callback: () => void): () => void {
  listeners.add(callback)
  window.addEventListener('storage', callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', callback)
  }
}

// Inlined verbatim into _document.tsx as a blocking <script>, so it must
// stay self-contained (no imports) and run before first paint to avoid a
// flash of the wrong theme.
export const themeInitScript = `(function () {
  try {
    var theme = window.localStorage.getItem('${STORAGE_KEY}');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  } catch (e) {}
})();`
