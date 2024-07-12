/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_PEXELS_API_KEY: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
  },
};

export default nextConfig;
