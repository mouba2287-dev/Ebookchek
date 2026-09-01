const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'chariow.com', 'maketou.com'],
  },
}

module.exports = nextConfig
