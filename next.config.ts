import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "*.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "https://avatar.vercel.sh",
        protocol: "https",
      },
      {
        hostname: "dzpcrl8exv.ufs.sh",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
