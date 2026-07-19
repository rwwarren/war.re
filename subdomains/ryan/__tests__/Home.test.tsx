import { render, screen } from '@testing-library/react'
import Home from '../pages/n'

// `next/head` children are not committed to the DOM under jsdom, so these tests
// cover the page body. The <head> metadata is asserted end-to-end in e2e/.
describe('ryan.war.re resume page', () => {
  // The page derives copy from the current date (duration badges and the
  // "for N years" line), so pin the clock before rendering.
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2026-07-18T00:00:00Z'))
    render(<Home />)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the name heading', () => {
    expect(screen.getByRole('heading', { level: 1, name: 'Ryan Warren' })).toBeInTheDocument()
  })

  it('renders every resume section heading', () => {
    for (const section of [
      'Technical Experience',
      'Relevant Work Experience',
      'Related Activities',
      'Education',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name: section })).toBeInTheDocument()
    }
  })

  it('renders the contact links in the header', () => {
    expect(screen.getByRole('link', { name: 'linkedin.com/in/ryanwwarren' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ryanwwarren'
    )
    expect(screen.getByRole('link', { name: 'github.com/rwwarren' })).toHaveAttribute(
      'href',
      'https://github.com/rwwarren'
    )
  })

  it('renders the email as plain text excluded from snippets', () => {
    // The address is deliberately not a link (see commit "Remove email link
    // and display as plain text") and is marked data-nosnippet for privacy.
    const email = screen.getByText('ryan@war.re')
    expect(email).toHaveAttribute('data-nosnippet')
    expect(screen.queryByRole('link', { name: 'ryan@war.re' })).not.toBeInTheDocument()
  })

  it('opens every external link safely (target + noopener)', () => {
    const externalLinks = screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href')?.startsWith('http'))
    expect(externalLinks.length).toBeGreaterThan(0)
    for (const link of externalLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('computes the web-programming year count from the current date', () => {
    // 2026 - 2010 with the clock pinned above.
    expect(screen.getByText(/for 16 years using a host service/)).toBeInTheDocument()
  })

  it('shows an inclusive duration badge for a completed role', () => {
    // March 2021 - February 2024 counts the end month, so exactly 3 years.
    expect(screen.getByText('[3 Years]')).toBeInTheDocument()
  })

  it('shows a duration badge for the current role', () => {
    // March 2024 - Present with the clock pinned to July 2026.
    expect(screen.getByText('[2 Years 5 Months]')).toBeInTheDocument()
  })
})
