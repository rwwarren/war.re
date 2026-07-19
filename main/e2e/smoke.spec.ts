import AxeBuilder from '@axe-core/playwright'
import { test, expect } from './fixtures'

test.describe('war.re main site', () => {
  test('content route renders the homepage', async ({ page }) => {
    await page.goto('/n')
    await expect(page).toHaveTitle(/War\.re/)
    await expect(page.getByRole('heading', { level: 1, name: 'Ryan Warren' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: 'Software Engineer' })).toBeVisible()
  })

  test('content route is visually stable', async ({ page }) => {
    // Freeze the clock so date-derived copy (the footer year) cannot drift
    // the baseline over time.
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

  test('social icons expose descriptive alt text', async ({ page }) => {
    await page.goto('/n')
    await expect(page.getByAltText('Github link')).toBeVisible()
    await expect(page.getByAltText('Linkedin link')).toBeVisible()
    await expect(page.getByAltText('Stack Overflow link')).toBeVisible()
  })

  test('exposes the canonical and Open Graph metadata', async ({ page }) => {
    await page.goto('/n')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://war.re/n')
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Ryan Warren - Software Engineer'
    )
  })

  test('root redirects visitors to the content route', async ({ page }) => {
    await page.goto('/')
    // `/` is a meta-refresh shell that forwards to `/n`.
    await page.waitForURL('**/n')
    await expect(page.getByRole('heading', { level: 1, name: 'Ryan Warren' })).toBeVisible()
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
