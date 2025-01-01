/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  async rewrites() {
    return [
      {
        source: '/api/contests',
        destination: 'https://kontests.net/api/v1/all'
      }
    ]
  }
}

module.exports = nextConfig