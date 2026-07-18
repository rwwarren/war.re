import AxeBuilder from '@axe-core/playwright'
import { test, expect } from './fixtures'

test.describe('ryan.war.re resume', () => {
  test('content route renders the resume', async ({ page }) => {
    await page.goto('/n')
    await expect(page).toHaveTitle(/Ryan Warren - Resume/)
    await expect(page.getByRole('heading', { level: 1, name: 'Ryan Warren' })).toBeVisible()
  })

  test('renders each major resume section', async ({ page }) => {
    await page.goto('/n')
    for (const section of [
      'Technical Experience',
      'Relevant Work Experience',
      'Related Activities',
      'Education',
    ]) {
      await expect(page.getByRole('heading', { level: 2, name: section })).toBeVisible()
    }
  })

  test('content route is visually stable', async ({ page }) => {
    // Freeze the clock so date-derived copy (duration badges and the
    // "for N years" line) cannot drift the baseline over time.
    await page.clock.setFixedTime(new Date('2026-01-15T12:00:00'))
    await page.goto('/n')
    await expect(page.getByRole('heading', { level: 1, name: 'Ryan Warren' })).toBeVisible()
    await expect(page).toHaveScreenshot('content.png', { fullPage: true })
  })

  test('external links open safely in a new tab', async ({ page }) => {
    await page.goto('/n')
    const externalLinks = page.locator('a[href^="http"]')
    const count = await externalLinks.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noopener/)
    }
  })

  test('exposes the canonical and Open Graph metadata', async ({ page }) => {
    await page.goto('/n')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://ryan.war.re/n'
    )
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Ryan Warren - Resume'
    )
  })

  test('root redirects visitors to the content route', async ({ page }) => {
    await page.goto('/')
    // `/` is a meta-refresh shell that forwards to `/n`.
    await page.waitForURL('**/n')
    await expect(page.getByRole('heading', { level: 1, name: 'Ryan Warren' })).toBeVisible()
  })

  test('work entries show computed duration badges', async ({ page }) => {
    await page.goto('/n')
    // March 2021 - February 2024 at Stripe: inclusive counting, exactly 3 years.
    await expect(page.getByText('[3 Years]')).toBeVisible()
    // The current role renders a live badge whose value depends on today.
    await expect(page.getByText(/^\[\d+ Years?( \d+ Months?)?\]$/).first()).toBeVisible()
  })

  test('unknown routes serve the 404 page', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1, name: '404' })).toBeVisible()
  })

  test('404 page links back to the homepage', async ({ page }) => {
    await page.goto('/this-route-does-not-exist')
    await page.getByRole('link', { name: 'Back to home' }).click()
    // `/` is a meta-refresh shell that forwards to `/n`.
    await page.waitForURL('**/n')
    await expect(page.getByRole('heading', { level: 1, name: 'Ryan Warren' })).toBeVisible()
  })

  test('content route has no detectable accessibility violations', async ({ page }) => {
    await page.goto('/n')
    const { violations } = await new AxeBuilder({ page }).analyze()
    expect(violations).toEqual([])
  })

  test('404 page has no detectable accessibility violations', async ({ page }) => {
    await page.goto('/this-route-does-not-exist')
    const { violations } = await new AxeBuilder({ page }).analyze()
    expect(violations).toEqual([])
  })
})
