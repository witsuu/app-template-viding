/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
