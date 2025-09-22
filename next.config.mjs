/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["i.ibb.co", "images.unsplash.com"],
  },
};

export default nextConfig;
