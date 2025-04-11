import type { NextConfig } from "next";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingExcludes: {
    "/_next/static": ["**/*"],
  },
};

export default withBundleAnalyzer(nextConfig);
