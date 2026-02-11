// craco.config.js - Simplified config for IEM BSH Frontend
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
