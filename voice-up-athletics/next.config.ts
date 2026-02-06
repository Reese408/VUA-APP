import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'voice-up-athletics.s3.us-east-2.amazonaws.com',
        pathname: '/Images/**',
      },
    ],
  },
};

export default nextConfig;
