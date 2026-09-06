const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Playwright specs live in e2e/ and run via `yarn e2e`, not Jest.
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/'],
  // The content page (`pages/n`), the theme components, the theme storage
  // module, and the 404 page are the units worth testing here, all of which
  // have real RTL specs in __tests__/. The redirect shell and Next internals
  // (`_app`, `_document`) have no meaningful jsdom render and are covered by
  // `yarn e2e` instead.
  collectCoverageFrom: [
    'pages/n/**/*.{ts,tsx}',
    'pages/404.tsx',
    'components/**/*.{ts,tsx}',
    'lib/**/*.ts',
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
