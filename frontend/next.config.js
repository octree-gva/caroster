const withPWA = require('next-pwa');
const {withSentryConfig} = require('@sentry/nextjs');
const {STRAPI_URL = 'http://localhost:1337'} = process.env;

const moduleExports = withPWA({
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

const SentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
