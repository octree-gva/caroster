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
      {
        source: '/admin/:slug*',
        destination: `${STRAPI_URL}/admin/:slug*`,
      },
      {
        source: '/i18n/:slug*',
        destination: `${STRAPI_URL}/i18n/:slug*`,
      },
      {
        source: '/content-manager/:slug*',
        destination: `${STRAPI_URL}/content-manager/:slug*`,
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
