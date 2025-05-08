/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Replace with your image domain
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;
