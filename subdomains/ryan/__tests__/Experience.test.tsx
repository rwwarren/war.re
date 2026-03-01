import { render, screen } from '@testing-library/react'
import Experience from '../components/Experience'

describe('Experience', () => {
  it('renders the heading text', () => {
    render(<Experience heading="Work Experience" />)
    expect(screen.getByRole('heading', { name: 'Work Experience', level: 2 })).toBeInTheDocument()
  })
})
