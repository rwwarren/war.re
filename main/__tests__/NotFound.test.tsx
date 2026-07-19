import { render, screen } from '@testing-library/react'
import NotFound from '../pages/404'

describe('war.re 404 page', () => {
  beforeEach(() => render(<NotFound />))

  it('renders the 404 heading', () => {
    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument()
  })

  it('links back to the homepage', () => {
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/')
  })
})
