import {
  applyTheme,
  getServerTheme,
  getStoredTheme,
  storeTheme,
  subscribeTheme,
  themeInitScript,
} from '../lib/theme'

describe('theme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  describe('getServerTheme', () => {
    it('always returns system (the SSR/hydration-safe snapshot)', () => {
      expect(getServerTheme()).toBe('system')
    })
  })

  describe('getStoredTheme', () => {
    it('returns system when nothing has been saved', () => {
      expect(getStoredTheme()).toBe('system')
    })

    it('returns the saved theme', () => {
      window.localStorage.setItem('theme', 'dark')
      expect(getStoredTheme()).toBe('dark')

      window.localStorage.setItem('theme', 'light')
      expect(getStoredTheme()).toBe('light')
    })

    it('falls back to system for an unrecognized stored value', () => {
      window.localStorage.setItem('theme', 'blue')
      expect(getStoredTheme()).toBe('system')
    })

    it('falls back to system when localStorage throws', () => {
      jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
        throw new Error('storage disabled')
      })
      expect(getStoredTheme()).toBe('system')
      jest.restoreAllMocks()
    })
  })

  describe('storeTheme', () => {
    it('removes the saved preference for system', () => {
      window.localStorage.setItem('theme', 'dark')
      storeTheme('system')
      expect(window.localStorage.getItem('theme')).toBeNull()
    })

    it('saves an explicit preference', () => {
      storeTheme('light')
      expect(window.localStorage.getItem('theme')).toBe('light')

      storeTheme('dark')
      expect(window.localStorage.getItem('theme')).toBe('dark')
    })

    it('notifies subscribers', () => {
      const listener = jest.fn()
      const unsubscribe = subscribeTheme(listener)
      storeTheme('dark')
      expect(listener).toHaveBeenCalledTimes(1)
      unsubscribe()
    })

    it('still notifies subscribers when localStorage throws', () => {
      jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
        throw new Error('storage disabled')
      })
      const listener = jest.fn()
      const unsubscribe = subscribeTheme(listener)

      expect(() => storeTheme('dark')).not.toThrow()
      expect(listener).toHaveBeenCalledTimes(1)

      unsubscribe()
      jest.restoreAllMocks()
    })
  })

  describe('applyTheme', () => {
    it('removes data-theme for system', () => {
      document.documentElement.setAttribute('data-theme', 'dark')
      applyTheme('system')
      expect(document.documentElement).not.toHaveAttribute('data-theme')
    })

    it('sets data-theme for an explicit theme', () => {
      applyTheme('dark')
      expect(document.documentElement).toHaveAttribute('data-theme', 'dark')

      applyTheme('light')
      expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    })
  })

  describe('subscribeTheme', () => {
    it('notifies on a storage event from another tab', () => {
      const listener = jest.fn()
      const unsubscribe = subscribeTheme(listener)

      window.dispatchEvent(new Event('storage'))
      expect(listener).toHaveBeenCalledTimes(1)

      unsubscribe()
    })

    it('stops notifying once unsubscribed', () => {
      const listener = jest.fn()
      const unsubscribe = subscribeTheme(listener)
      unsubscribe()

      storeTheme('dark')
      window.dispatchEvent(new Event('storage'))
      expect(listener).not.toHaveBeenCalled()
    })
  })

  describe('themeInitScript', () => {
    // Inlined verbatim into _document.tsx (see lib/theme.ts) and run as a
    // blocking <script> before hydration, so it never goes through the
    // module's own exported functions — run it directly to pin its behavior.
    function run() {
      new Function(themeInitScript)()
    }

    it('applies a saved explicit theme before first paint', () => {
      window.localStorage.setItem('theme', 'dark')
      run()
      expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    })

    it('leaves data-theme unset with no saved preference', () => {
      run()
      expect(document.documentElement).not.toHaveAttribute('data-theme')
    })

    it('does not throw when localStorage is unavailable', () => {
      jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
        throw new Error('storage disabled')
      })
      expect(run).not.toThrow()
      jest.restoreAllMocks()
    })
  })
})
