import type { NextConfig } from "next";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Explicitly exclude the entire public directory or specific sub-folders
  // from serverless function bundles. Assets in `public` are served statically by Vercel.
  outputFileTracingExcludes: {
    "**/*": [
      // Apply to all functions
      "./public/projects/**/*", // Exclude all files within public/projects
      // You might need to be more specific if other public assets ARE needed by a function,
      // but generally, public assets shouldn't be bundled.
      // Keep the existing exclusion if necessary, though often excluding ./public covers it.
      // "./public/**/*" // Alternative: exclude everything in public
    ],
    // Keep existing exclusions if needed, but the above is likely the key fix
    "/_next/static": ["**/*"],
  },
};

export default withBundleAnalyzer(nextConfig);
