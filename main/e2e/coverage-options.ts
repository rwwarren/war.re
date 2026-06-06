import type { CoverageReportOptions } from 'monocart-coverage-reports'

// Shared monocart config for the Playwright V8 coverage run. Writes to
// `coverage/e2e/` so it doesn't collide with Jest's `coverage/lcov.info`; keep
// the path in sync with the `main-e2e` Codecov upload step in ci.yml.
export const coverageOptions: CoverageReportOptions = {
  name: 'war.re main e2e coverage',
  outputDir: './coverage/e2e',
  reports: [['lcovonly', { file: 'lcov.info' }], ['console-summary']],
  // After source-map resolution, keep only this app's TS/JS source files
  // (drops Next manifests, the webpack runtime, and CSS-module pseudo-entries).
  sourceFilter: (sourcePath) =>
    /\/(pages|components|lib)\//.test(sourcePath) &&
    /\.(ts|tsx|js|jsx)$/.test(sourcePath) &&
    !sourcePath.includes('node_modules'),
  // Turbopack emits sources under `[project]/`; rewrite to repo-root-relative
  // paths so Codecov matches them against `main/...` in the tree. Idempotent —
  // monocart invokes this on both `add` and `generate`.
  sourcePath: (filePath) => {
    const rel = filePath.replace(/^\[project\]\//, '')
    return rel.startsWith('main/') ? rel : `main/${rel}`
  },
}
