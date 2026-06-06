import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ✅ Optimize images and performance */
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
