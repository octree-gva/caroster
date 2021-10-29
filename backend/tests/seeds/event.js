const faker = require('faker');

const TABLE_NAME = 'events';
const ITEM_COUNTS = 10;

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  await knex(TABLE_NAME).insert(knownEvent);

  // Generate items
  let items = [];
  for (let i = 0; i < ITEM_COUNTS; i++) items.push(generateItem());

  // Insert items
  await knex(TABLE_NAME).insert(items);
};

const knownEvent = {
  name: 'Test event',
  email: 'test@example.org',
  date: '2022-01-12',
  address: 'Uni-mail, Geneva, CH',
  uuid: '00000000-0000-0000-0000-000000000000',
};

const generateItem = () => ({
  name: faker.lorem.words(3),
  email: faker.internet.email(),
  date: faker.date.future(),
  address: faker.address.streetAddress(),
});
