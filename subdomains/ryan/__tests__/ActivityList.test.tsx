import { render, screen } from '@testing-library/react'
import ActivityList from '../components/ActivityList'

describe('ActivityList', () => {
  it('renders all items as list items', () => {
    render(<ActivityList items={['Item 1', 'Item 2', 'Item 3']} />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('renders an empty list when given no items', () => {
    render(<ActivityList items={[]} />)
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })
})
