/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ✅ Use only remotePatterns (domains is deprecated)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
