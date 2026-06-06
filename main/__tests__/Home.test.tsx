import { render, screen } from '@testing-library/react'
import Home from '../pages/n'

// `next/head` children are not committed to the DOM under jsdom, so these tests
// cover the page body. The <head> metadata is asserted end-to-end in e2e/.
describe('war.re content page', () => {
  beforeEach(() => render(<Home />))

  it('renders the name and role headings', () => {
    expect(screen.getByRole('heading', { level: 1, name: 'Ryan Warren' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Software Engineer' })).toBeInTheDocument()
  })

  it('renders the resume link to the ryan subdomain', () => {
    const resume = screen.getByRole('link', { name: 'resume' })
    expect(resume).toHaveAttribute('href', 'https://ryan.war.re/n')
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

  it('gives every social icon descriptive alt text', () => {
    expect(screen.getByAltText('Github link')).toBeInTheDocument()
    expect(screen.getByAltText('Linkedin link')).toBeInTheDocument()
    expect(screen.getByAltText('Stack Overflow link')).toBeInTheDocument()
  })

  it('renders a footer with the current year', () => {
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`©\\s*${year}\\s*war\\.re`))).toBeInTheDocument()
  })
})
