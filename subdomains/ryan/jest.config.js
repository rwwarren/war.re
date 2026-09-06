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
  // Coverage is gated on components/, lib/, and the content page (`pages/n`)
  // — the units with body markup or logic worth unit testing. The redirect
  // shell, 404 page, and Next internals are covered end-to-end instead
  // (`yarn e2e`), so including them here would misrepresent what Jest checks.
  collectCoverageFrom: ['components/**/*.{ts,tsx}', 'lib/**/*.ts', 'pages/n/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
})
