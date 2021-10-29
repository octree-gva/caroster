const {
  POSTGRES_USER = 'postgres',
  POSTGRES_PASSWORD = 'password',
  POSTGRES_HOST = 'localhost',
  POSTGRES_DB = 'strapi_test',
  POSTGRES_PORT = 5432,
} = process.env;

module.exports = {
  test: {
    client: 'pg',
    connection: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
    seeds: {
      directory: __dirname + '/tests/seeds',
    },
  },
};
