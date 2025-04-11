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
};

export default withBundleAnalyzer(nextConfig);
