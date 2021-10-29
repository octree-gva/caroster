const knexConfig = require('../../knexfile');
const knexInstance = require('knex')(knexConfig.test);
const {setupStrapi, destroyStrapi} = require('./strapi');

const setupDatabase = async () => {
  await setupStrapi();
  await destroyStrapi();

  console.log('\nSEEDING DATABASE...');
  await knexInstance.seed.run();
};

const destroyDatabase = () => {
  console.log('DESTROY DATABASE');
};

module.exports = {setupDatabase, destroyDatabase};
