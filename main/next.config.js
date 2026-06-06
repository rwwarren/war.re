// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Emit browser source maps so Playwright V8 coverage maps back to source
  // (see e2e/fixtures.ts). Only consumed by the coverage tooling; harmless in prod.
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
