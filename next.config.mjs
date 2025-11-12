/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Ignore ESLint errors during Vercel build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
