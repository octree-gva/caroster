const withPWA = require('next-pwa');
const {NODE_ENV} = process.env;

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: NODE_ENV !== 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
