import { CoverageReport } from 'monocart-coverage-reports'
import { coverageOptions } from './coverage-options'

export default async function globalTeardown() {
  if (!process.env.COVERAGE) return
  await new CoverageReport(coverageOptions).generate()
}
