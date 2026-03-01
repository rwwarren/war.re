// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/n',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
