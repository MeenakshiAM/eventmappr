/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'unpkg.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      }
    ],
  },
  // Configure environment variables if needed
  env: {
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
  },
  // Add redirects if needed
  async redirects() {
    return [
      {
        source: '/map',
        destination: '/explore',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    // Enable importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig; 