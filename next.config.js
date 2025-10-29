/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  // experimental: { appDir: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    config.cache = { type: 'memory' };
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib', 'configs', 'contexts', 'constants'],
  },
  images: {
    domains: ['images.unsplash.com', 'i.pravatar.cc', 'cdn.tgdd.vn', 'i.ibb.co'],
  },
};

module.exports = nextConfig;
