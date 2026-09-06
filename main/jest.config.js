const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Playwright specs live in e2e/ and run via `yarn e2e`, not Jest.
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/'],
  // Every source .ts/.tsx file is covered except: generated/tooling files
  // (type declarations, Playwright's own config and specs) and
  // `pages/_document.tsx` and `pages/index.tsx`, which have no meaningful
  // jsdom render — `_document`'s `<Html>` throws outside Next's real
  // document render, and the redirect shell's only body content is a
  // `<noscript>` link that jsdom (like a real browser with JS enabled)
  // renders empty. Both are covered end-to-end instead (`yarn e2e`).
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!.next/**',
    '!out/**',
    '!e2e/**',
    '!playwright.config.ts',
    '!pages/_document.tsx',
    '!pages/index.tsx',
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
