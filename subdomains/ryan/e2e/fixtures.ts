import { test as base, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { CoverageReport } from 'monocart-coverage-reports'
import { coverageOptions } from './coverage-options'

const collectCoverage = !!process.env.COVERAGE

// Opt-in V8 coverage (COVERAGE=1, via `yarn e2e:coverage`). The static export is
// served from `out/`, so each chunk's source map sits at `out/<pathname>.map`;
// attach it explicitly rather than relying on http resolution of sourceMappingURL.
export const test = base.extend({
  page: async ({ page, browserName }, use) => {
    const enabled = collectCoverage && browserName === 'chromium'
    if (enabled) {
      await page.coverage.startJSCoverage({ resetOnNavigation: false })
    }

    // `use` is the Playwright fixture API, not a React hook.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page)

    if (enabled) {
      const entries = await page.coverage
        .stopJSCoverage()
        .then((list) => list.filter((entry) => entry.url.includes('/_next/static/chunks/')))
      // Attach each chunk's source map from the served `out/` dir when present;
      // unmapped chunks pass through and are dropped later by `sourceFilter`.
      const withMaps = entries.map((entry) => {
        const mapFile = path.join('out', `${new URL(entry.url).pathname}.map`)
        try {
          return { ...entry, sourceMap: JSON.parse(readFileSync(mapFile, 'utf8')) }
        } catch {
          return entry
        }
      })
      await new CoverageReport(coverageOptions).add(withMaps)
    }
  },
})

export { expect }
