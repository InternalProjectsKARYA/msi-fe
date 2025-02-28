module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    nextScriptWorkers: false,
    turbo: {},
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
 
 
