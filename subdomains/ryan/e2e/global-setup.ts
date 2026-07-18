import { CoverageReport } from 'monocart-coverage-reports'
import { coverageOptions } from './coverage-options'

export default async function globalSetup() {
  if (!process.env.COVERAGE) return
  await new CoverageReport(coverageOptions).cleanCache()
}
