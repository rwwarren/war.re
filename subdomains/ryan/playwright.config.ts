import { defineConfig, devices } from '@playwright/test'

const PORT = 3200
const baseURL = `http://127.0.0.1:${PORT}`

/**
 * Smoke tests run against the static export in `out/`, so `yarn build` must run
 * first. In CI the workflow builds before invoking Playwright; locally use
 * `yarn build && yarn e2e`.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  // Allow a small per-pixel diff budget so anti-aliasing/font-hinting jitter
  // between machines doesn't fail the visual snapshots. Regenerate baselines in
  // the CI environment with the "Update Playwright snapshots" workflow.
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    },
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npx serve out --no-clipboard --no-request-logging -l ${PORT}`,
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
})
