const {STRAPI_URL = 'http://localhost:1337'} = process.env;

module.exports = {
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${STRAPI_URL}/graphql`,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
