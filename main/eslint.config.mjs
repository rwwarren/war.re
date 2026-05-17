import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'coverage/**'],
  },
]

export default config
