module.exports = {
  // (config, options, webpack)
  webpack: (config) => {
    config.entry.main = "./server/index.js";
    return config;
  }
};