module.exports = ({env}) => ({
  timeout: 10000,
  load: {
    after: ['parser', 'router', 'next'],
  },
  settings: {
    next: {
      enabled: true,
      dir: '/srv/app/frontend',
      quiet: false,
      conf: {},
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
