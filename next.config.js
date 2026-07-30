/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.qrserver.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'https://motion.alicazone.my.id',
  },
}

module.exports = nextConfig