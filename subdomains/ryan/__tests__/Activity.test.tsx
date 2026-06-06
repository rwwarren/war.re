import { render, screen } from '@testing-library/react'
import Activity from '../components/Activity'

/**
 * `Activity` wraps the only real business logic in the codebase: `formatDuration`,
 * which is exercised here through the rendered `<h6>[…]</h6>` badge. The function
 * itself is module-private, so these tests pin its behaviour via the component.
 */
describe('Activity', () => {
  const duration = () => screen.queryByRole('heading', { level: 6 })?.textContent ?? null

  describe('duration formatting', () => {
    it('renders years and months together', () => {
      render(<Activity name="Engineer" start="January 2020" end="March 2022" items={[]} />)
      expect(duration()).toBe('[2 Years 2 Months]')
    })

    it('combines a single year and single month using singular units', () => {
      render(<Activity name="Engineer" start="January 2020" end="February 2021" items={[]} />)
      expect(duration()).toBe('[1 Year 1 Month]')
    })

    it('pluralizes a year-only span', () => {
      render(<Activity name="Engineer" start="January 2020" end="January 2023" items={[]} />)
      expect(duration()).toBe('[3 Years]')
    })

    it('uses the singular for exactly one year', () => {
      render(<Activity name="Engineer" start="January 2020" end="January 2021" items={[]} />)
      expect(duration()).toBe('[1 Year]')
    })

    it('renders a months-only span when under a year', () => {
      render(<Activity name="Engineer" start="January 2020" end="May 2020" items={[]} />)
      expect(duration()).toBe('[4 Months]')
    })

    it('uses the singular for exactly one month', () => {
      render(<Activity name="Engineer" start="January 2020" end="February 2020" items={[]} />)
      expect(duration()).toBe('[1 Month]')
    })

    it('omits the badge entirely for a zero-length span', () => {
      // formatDuration returns '' (falsy), so the <h6> is never rendered.
      render(<Activity name="Engineer" start="January 2020" end="January 2020" items={[]} />)
      expect(screen.queryByRole('heading', { level: 6 })).not.toBeInTheDocument()
    })

    it('omits the badge when no start date is provided', () => {
      render(<Activity name="Engineer" end="Graduated June 2015" items={[]} />)
      expect(screen.queryByRole('heading', { level: 6 })).not.toBeInTheDocument()
    })
  })

  describe('"Present" end date', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date('2024-06-15T00:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('measures the span up to the current date', () => {
      render(<Activity name="Engineer" start="March 2024" end="Present" items={[]} />)
      expect(duration()).toBe('[3 Months]')
    })

    it('treats "present" case-insensitively', () => {
      render(<Activity name="Engineer" start="March 2024" end="present" items={[]} />)
      expect(duration()).toBe('[3 Months]')
    })
  })

  describe('heading and metadata', () => {
    it('links the company when companyLink is provided', () => {
      render(
        <Activity
          name="Senior Software Engineer"
          company="Stripe"
          companyLink="https://stripe.com"
          end="Present"
          items={[]}
        />
      )
      const link = screen.getByRole('link', { name: 'Stripe' })
      expect(link).toHaveAttribute('href', 'https://stripe.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders the company as plain text without a link', () => {
      render(<Activity name="Engineer" company="Porch" end="Present" items={[]} />)
      expect(screen.getByText(/Porch/)).toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('appends the team in parentheses', () => {
      render(
        <Activity name="Engineer" company="Stripe" team="Internal Tools" end="Present" items={[]} />
      )
      expect(screen.getByRole('heading', { level: 3 }).textContent).toContain('(Internal Tools)')
    })

    it('accepts a ReactNode name', () => {
      render(
        <Activity
          name={<a href="https://example.com/project">PiDuinoLock</a>}
          end="Present"
          items={[]}
        />
      )
      expect(screen.getByRole('link', { name: 'PiDuinoLock' })).toHaveAttribute(
        'href',
        'https://example.com/project'
      )
    })
  })

  describe('date range', () => {
    it('shows "start - end" when both are present', () => {
      render(<Activity name="Engineer" start="March 2021" end="February 2024" items={[]} />)
      expect(screen.getByText('March 2021 - February 2024')).toBeInTheDocument()
    })

    it('shows only the end when there is no start', () => {
      render(<Activity name="Education" end="Graduated June 2015" items={[]} />)
      expect(screen.getByText('Graduated June 2015')).toBeInTheDocument()
    })
  })

  it('renders its items through ActivityList', () => {
    render(<Activity name="Engineer" end="Present" items={['First bullet', 'Second bullet']} />)
    expect(screen.getByText('First bullet')).toBeInTheDocument()
    expect(screen.getByText('Second bullet')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
