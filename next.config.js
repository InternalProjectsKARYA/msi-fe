module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  devIndicators: {
    buildActivity: false,
    autoPrerender: false,
  },
  webpack: (config) => {
    config.devtool = false; // Disables source maps
    return config;
  },
};
 
 
