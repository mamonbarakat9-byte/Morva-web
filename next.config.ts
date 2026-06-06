import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ✅ Fix Turbopack workspace root warning */
  turbopack: {
    root: __dirname,
  },

  /* ✅ Optimize images and performance */
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },

  /* ✅ Enable SWC minification for faster builds */
  swcMinify: true,

  /* ✅ Increase serverless function timeout for Vercel */
  serverRuntimeConfig: {
    apiTimeout: 30000,
  },
};

export default nextConfig;
