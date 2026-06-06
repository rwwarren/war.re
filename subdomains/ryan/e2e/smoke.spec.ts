import { test, expect } from '@playwright/test'

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

  test('unknown routes serve the 404 page', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist')
    expect(response?.status()).toBe(404)
  })
})
