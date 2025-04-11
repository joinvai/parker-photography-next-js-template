import type { NextConfig } from "next";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Use output: 'standalone' for optimized builds
  output: "standalone",
  // Correctly configure outputFileTracingExcludes at the root level
  outputFileTracingExcludes: {
    "*": [
      // Exclude all files in public directory from all serverless functions
      "public/**/*",
    ],
  },
  // Add this to ensure Sharp works properly
  images: {
    domains: ["vercel.com"], // Add any domains you need
    formats: ["image/avif", "image/webp"],
    // This is important for Sharp to work correctly
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
