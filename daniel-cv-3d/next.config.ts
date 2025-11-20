import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable optimization for better Vercel compatibility
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 2678400, // Cache for 31 days
    domains: [],
    remotePatterns: [],
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
      {
        pathname: '/company_icons/**',
        search: '',
      },
      {
        pathname: '/social_preview.png',
        search: '',
      },
      {
        pathname: '/favicon*',
        search: '',
      },
    ],
  },
};

export default nextConfig;
