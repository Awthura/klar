import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/klar",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
