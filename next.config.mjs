/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Set fs: false in the Webpack configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

export default nextConfig;
