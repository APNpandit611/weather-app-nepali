import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.worldweatheronline.com',
        // optional: port and pathname
        // port: '',
        // pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
