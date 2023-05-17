/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  "output": "export",
  images: {
    unoptimized: true
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
