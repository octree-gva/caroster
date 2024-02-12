const {i18n} = require('./react-i18next.config');
const {
  NODE_ENV,
  DEV_TILES_URL,
  STRAPI_URL = 'http://localhost:1337',
  DEFAULT_LOCALE = 'share',
  MAPBOX_TOKEN,
  MAPBOX_URL,
} = process.env;

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: NODE_ENV !== 'production',
});

module.exports = withPWA({
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    STRAPI_URL,
    DEV_TILES_URL,
    DEFAULT_LOCALE,
    MAPBOX_CONFIGURED: !!MAPBOX_TOKEN && !!MAPBOX_URL,
  },
  i18n,

  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${STRAPI_URL}/graphql`,
      },
      {
        source: '/api/nauth/:slug*',
        destination: `/api/nauth/:slug*`,
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
      {
        source: '/email-designer/:slug*',
        destination: `${STRAPI_URL}/email-designer/:slug*`,
      },
    ];
  },
});
