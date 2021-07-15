module.exports = ({env}) => ({
  timeout: 10000,
  load: {
    after: ['parser', 'router', 'next-proxy'],
  },
  settings: {
    'next-proxy': {
      enabled: true,
      host: env('NEXT_URL', 'http://localhost:3000'),
      conf: {
        overrideResponseHeaders: {
          'next-proxy': true,
        },
      },
    },
    sentry: {
      enabled: true,
      settings: {
        dsn: env('SENTRY_DSN', null),
        release: env('VERSION', 'dev'),
        environment: env('NODE_ENV', 'development'),
        serverName: env('STRAPI_URL', 'local'),
      },
    },
  },
});
