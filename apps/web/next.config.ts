import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Prevent ESLint errors from blocking production builds on Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevent TypeScript check errors from blocking production builds on Vercel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
