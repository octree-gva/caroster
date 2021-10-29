module.exports = ({env}) => {
  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: env('POSTGRES_HOST', 'localhost'),
          port: env('POSTGRES_PORT', 5432),
          database: env('POSTGRES_DB', 'strapi_test'),
          username: env('POSTGRES_USER', 'postgres'),
          password: env('POSTGRES_PASSWORD', 'password'),
        },
        options: {},
      },
    },
  };
};
