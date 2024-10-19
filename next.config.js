/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      }
    ],
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  async rewrites(){
    return [
      {
        source: '/api/:path*',
        destination: 'https://17hw7x4j-7130.use2.devtunnels.ms/:path*',
      }
    ]
  }
};

module.exports = nextConfig;
