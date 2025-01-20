import createNextIntlPlugin from 'next-intl/plugin';

export default createNextIntlPlugin({
  locales: ['en', 'it'],
  defaultLocale: 'en'
})({
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
      },
      {
        protocol: 'https',
        hostname: '**.example.com',
      }
    ],
  },
  
  experimental: {
    serverActions: { enabled: true },
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
    };
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
    };
    return config;
  },
  
  // Remove the logging configuration as it's not a standard Next.js option
  env: {
    NEXT_INTL_TRAILING_SLASH: 'always',
    // Explicitly set the Next.js environment
    NEXT_PUBLIC_ENV: process.env.NODE_ENV
  }
});