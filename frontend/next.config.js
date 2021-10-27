const withPWA = require('next-pwa');
const {withSentryConfig} = require('@sentry/nextjs');
const {NODE_ENV} = process.env;

const moduleExports = withPWA({
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

const SentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  silent: true,
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
