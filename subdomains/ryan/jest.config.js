const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Playwright specs live in e2e/ and run via `yarn e2e`, not Jest.
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/'],
  coverageReporters: ['text', 'lcov'],
  // Every source .ts/.tsx file is covered except generated/tooling files
  // (type declarations, Playwright's own config and specs) — never app code
  // to test. `_document.tsx` and `pages/index.tsx` can't be *rendered* under
  // jsdom (see Document.test.tsx and RootRedirect.test.tsx for why), so
  // their specs assert on the returned element tree instead; end-to-end
  // (`yarn e2e`) still covers the real browser behavior.
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!.next/**',
    '!out/**',
    '!e2e/**',
    '!playwright.config.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
})
