import { fireEvent, render, screen } from '@testing-library/react'
import ThemeToggle from '../components/ThemeToggle'

// jsdom's window.scrollY is a getter with no setter, so tests drive it by
// redefining the property before dispatching the scroll event the component
// listens for.
function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  fireEvent.scroll(window)
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    scrollTo(0)
  })

  it('defaults to System with no explicit data-theme attribute', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement).not.toHaveAttribute('data-theme')
  })

  it('choosing Dark saves the preference and applies it to the document', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }))

    expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'false')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')
  })

  it('choosing Light saves the preference and applies it to the document', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('radio', { name: 'Light' }))

    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(window.localStorage.getItem('theme')).toBe('light')
  })

  it('choosing System after an explicit choice clears the saved preference and the attribute', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }))
    fireEvent.click(screen.getByRole('radio', { name: 'System' }))

    expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement).not.toHaveAttribute('data-theme')
    expect(window.localStorage.getItem('theme')).toBeNull()
  })

  it('picks up a preference changed in another tab via the storage event', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'true')

    // Simulate another tab writing the preference directly (no local click),
    // then firing the native `storage` event this tab listens for.
    window.localStorage.setItem('theme', 'dark')
    fireEvent(window, new Event('storage'))

    expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  describe('scroll visibility', () => {
    // Grab the region once, before it might become inert, and keep reusing
    // that reference — an inert element may no longer match role queries.
    function renderRegion() {
      render(<ThemeToggle />)
      return screen.getByRole('region', { name: 'Theme' })
    }

    it('is visible (not inert) at the top of the page', () => {
      const region = renderRegion()
      expect(region).not.toHaveAttribute('inert')
    })

    it('hides after scrolling down past the direction threshold', () => {
      const region = renderRegion()
      scrollTo(50)
      expect(region).toHaveAttribute('inert')
    })

    it('reappears when scrolling back up', () => {
      const region = renderRegion()
      scrollTo(50)
      expect(region).toHaveAttribute('inert')

      scrollTo(20)
      expect(region).not.toHaveAttribute('inert')
    })

    it('stays visible near the top even while scrolling down', () => {
      const region = renderRegion()
      scrollTo(5)
      expect(region).not.toHaveAttribute('inert')
    })

    it('reappears once scrolled back near the top', () => {
      const region = renderRegion()
      scrollTo(50)
      expect(region).toHaveAttribute('inert')

      scrollTo(5)
      expect(region).not.toHaveAttribute('inert')
    })

    it('ignores scroll jitter below the direction threshold', () => {
      const region = renderRegion()
      scrollTo(50)
      expect(region).toHaveAttribute('inert')

      scrollTo(52)
      expect(region).toHaveAttribute('inert')
    })
  })
})
