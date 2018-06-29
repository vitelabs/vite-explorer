module.exports = {
  // (config, options, webpack)
  webpack: (config) => {
    config.entry.main = "./server/index.js";
    config.resolve.modules = ["./server"];
    return config;
  }
};
