/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  async rewrites() {
    return [
      {
        source: '/api/contests',
        destination: '/api/contests'
      }
    ]
  }
}

module.exports = nextConfig