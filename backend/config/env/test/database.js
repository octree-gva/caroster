module.exports = ({env}) => {
  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'sqlite',
          filename: env('DATABASE_PATH', '.tmp/test.db'),
        },
        options: {
          useNullAsDefault: true,
          pool: {
            min: 0,
            max: 1,
          },
        },
      },
    },
  };
};
