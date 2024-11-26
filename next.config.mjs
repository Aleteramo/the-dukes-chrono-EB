import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  distDir: '.next',
  cleanDistDir: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com',
      }
    ],
  },
  experimental: {
    serverActions: {
      enabled: true
    },
    optimizePackageImports: ['@heroicons/react']
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/.well-known/vercel/microfrontend-routing',
          destination: '/api/microfrontend-routing'
        }
      ]
    }
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    return config;
  },
};

export default withNextIntl(config);
