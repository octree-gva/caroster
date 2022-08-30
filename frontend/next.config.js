const withPWA = require('next-pwa');
const {STRAPI_URL = 'http://localhost:1337', NODE_ENV} = process.env;

module.exports = withPWA({
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${STRAPI_URL}/graphql`,
      },
      {
        source: '/api/:slug*',
        destination: `${STRAPI_URL}/api/:slug*`,
      },
    ];
  },

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
