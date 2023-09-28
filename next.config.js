/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'rickandmortyapi.com',
      'picsum.photos',
      'res.cloudinary.com'
    ]
  }
}

module.exports = nextConfig
