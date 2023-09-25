/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'rickandmortyapi.com',
      'picsum.photos'
    ]
  }
}

module.exports = nextConfig
