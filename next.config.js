/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.pexels.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
