import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [{ hostname: "ac.goit.global" }],
  },
  reactCompiler: true,
};

export default nextConfig;
