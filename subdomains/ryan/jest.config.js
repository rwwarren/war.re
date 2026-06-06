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
  // Coverage is gated on components/, where the unit tests live. The `pages/`
  // tree is verified end-to-end by the Playwright smoke tests (`yarn e2e`), so
  // including it in the Jest coverage gate would misrepresent what Jest checks.
  collectCoverageFrom: ['components/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
})
