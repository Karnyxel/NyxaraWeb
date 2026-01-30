// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    scrollRestoration: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.discordapp.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.discordapp.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '103.195.101.224',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128],
  },
  
  reactCompiler: true,
  
  // Performance optimizations
  compress: true,
  generateEtags: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: '2.0.0',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/invite',
        destination: 'https://discord.com/oauth2/authorize?client_id=1432444397299175514&permissions=8&scope=bot%20applications.commands',
        permanent: true,
      },
      {
        source: '/support',
        destination: 'https://discord.gg/nyxara',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/NyxaraBot',
        permanent: true,
      },
    ]
  },
  
  // SOLUCIÓN: Agregar rewrites para el proxy
  async rewrites() {
    return [
      {
        source: '/api/bot/:path*',
        destination: 'http://103.195.101.224:3001/api/:path*',
      },
    ];
  },
  
  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Output configuration
  output: 'standalone',
  
  // Transpile packages
  transpilePackages: ['lucide-react', '@radix-ui/*'],
}

export default nextConfig;