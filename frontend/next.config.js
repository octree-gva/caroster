const withPWA = require('next-pwa');
const {STRAPI_URL = 'http://localhost:1337'} = process.env;

module.exports = withPWA({
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${STRAPI_URL}/graphql`,
      },
    ];
  },
  pwa: {
    dest: 'public',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
