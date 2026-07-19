import { render, screen } from '@testing-library/react'
import Activity from '../components/Activity'

/**
 * `Activity` wraps the only real business logic in the codebase: `formatDuration`,
 * which is exercised here through the rendered `[…]` badge. The function itself
 * is module-private, so these tests pin its behaviour via the component.
 *
 * Durations count months inclusively (LinkedIn-style): the end month itself is
 * a worked month, so March 2021 - February 2024 is 3 years, not 2y 11m.
 */
describe('Activity', () => {
  const duration = () => screen.queryByText(/^\[.+\]$/)?.textContent ?? null

  describe('duration formatting', () => {
    it('counts the end month inclusively for a full stint', () => {
      render(<Activity name="Engineer" start="March 2021" end="February 2024" items={[]} />)
      expect(duration()).toBe('[3 Years]')
    })

    it('renders years and months together', () => {
      render(<Activity name="Engineer" start="January 2020" end="March 2022" items={[]} />)
      expect(duration()).toBe('[2 Years 3 Months]')
    })

    it('combines a single year and single month using singular units', () => {
      render(<Activity name="Engineer" start="January 2020" end="January 2021" items={[]} />)
      expect(duration()).toBe('[1 Year 1 Month]')
    })

    it('uses the singular for exactly one year', () => {
      render(<Activity name="Engineer" start="January 2020" end="December 2020" items={[]} />)
      expect(duration()).toBe('[1 Year]')
    })

    it('renders a months-only span when under a year', () => {
      render(<Activity name="Engineer" start="January 2020" end="April 2020" items={[]} />)
      expect(duration()).toBe('[4 Months]')
    })

    it('counts a same-month span as one month', () => {
      render(<Activity name="Engineer" start="January 2020" end="January 2020" items={[]} />)
      expect(duration()).toBe('[1 Month]')
    })

    it('omits the badge when no start date is provided', () => {
      render(<Activity name="Engineer" end="Graduated June 2015" items={[]} />)
      expect(duration()).toBeNull()
    })

    it('omits the badge when the start date does not parse', () => {
      render(<Activity name="Engineer" start="sometime in 2020" end="March 2022" items={[]} />)
      expect(duration()).toBeNull()
    })

    it('omits the badge when the end date is neither a month nor "Present"', () => {
      render(<Activity name="Engineer" start="January 2020" end="Graduated 2015" items={[]} />)
      expect(duration()).toBeNull()
    })

    it('omits the badge for a reversed range', () => {
      render(<Activity name="Engineer" start="March 2024" end="January 2024" items={[]} />)
      expect(duration()).toBeNull()
    })

    it('is not rendered as a heading', () => {
      // The badge is presentational; an <h6> under an <h3> breaks heading order.
      render(<Activity name="Engineer" start="January 2020" end="March 2022" items={[]} />)
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

    it('measures the span up to and including the current month', () => {
      render(<Activity name="Engineer" start="March 2024" end="Present" items={[]} />)
      expect(duration()).toBe('[4 Months]')
    })

    it('treats "present" case-insensitively', () => {
      render(<Activity name="Engineer" start="March 2024" end="present" items={[]} />)
      expect(duration()).toBe('[4 Months]')
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
