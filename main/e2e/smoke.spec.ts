import { test, expect } from '@playwright/test'

test.describe('war.re main site', () => {
  test('content route renders the homepage', async ({ page }) => {
    await page.goto('/n')
    await expect(page).toHaveTitle(/War\.re/)
    await expect(page.getByRole('heading', { level: 1, name: 'Ryan Warren' })).toBeVisible()
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
