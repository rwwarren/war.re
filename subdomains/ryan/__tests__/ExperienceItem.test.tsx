import { render, screen } from '@testing-library/react'
import ExperienceItem from '../components/ExperienceItem'

describe('ExperienceItem', () => {
  it('renders a link when url is provided', () => {
    render(<ExperienceItem name="React" url="https://react.dev" />)
    const link = screen.getByRole('link', { name: 'React' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://react.dev')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders plain text when no url is provided', () => {
    render(<ExperienceItem name="React" />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
