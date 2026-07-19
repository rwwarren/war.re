import { defineConfig, devices } from '@playwright/test'

const PORT = 3100
const baseURL = `http://127.0.0.1:${PORT}`

/**
 * Smoke tests run against the static export in `out/`, so `yarn build` must run
 * first. In CI the workflow builds before invoking Playwright; locally use
 * `yarn build && yarn e2e`.
 */
export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  globalTeardown: './e2e/global-teardown.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  // Keep visual baselines in a single e2e/__snapshots__/ dir (the path the
  // "Update Playwright snapshots" workflow commits) rather than Playwright's
  // default per-spec "<spec>-snapshots" folders.
  snapshotPathTemplate: '{testDir}/__snapshots__/{arg}-{projectName}-{platform}{ext}',
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
    // Runs the whole suite at a phone viewport (412px, under the responsive
    // breakpoints) with its own visual baseline. Pixel 7 stays on Chromium,
    // the only browser installed in CI.
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    command: `npx serve out --no-clipboard --no-request-logging -l ${PORT}`,
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
})
