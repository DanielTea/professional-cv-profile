import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
