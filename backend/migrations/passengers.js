/**
 * Migrate raw passengers to passenger components
 * for event waiting list & car passengers
 *
 * **WARNING**: 'passengers' column in 'cars' table must be cloned to
 * another column ('old_passengers') to avoid data loss BEFORE
 * deploying new project version. To do so:
 * - alter table cars add column old_passengers jsonb;
 * - update cars set old_passengers = passengers;
 *
 * Steps:
 * 1. Clone 'passengers' column in 'cars' table
 * 2. Start Strapi to apply new db schema
 * 3. Launch this script
 */

const Strapi = require('strapi');

const main = async () => {
  await Strapi().load();

  /**
   * Migrate event waiting list
   */
  const events = await strapi.services.event.find({_limit: -1});

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const {waiting_list} = event;
    if (!waiting_list) continue;
    const waitingList = waiting_list.map(name => ({name}));
    strapi.log.debug(`Migrate waiting list for event ${event.id}`);
    await strapi.services.event.update({id: event.id}, {waitingList});
  }

  /**
   * Migrate car passengers
   */
  const cars = await strapi.services.car.find({_limit: -1});
  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    const {old_passengers} = car;
    if (!old_passengers) continue;
    const passengers = old_passengers.map(name => ({name}));
    strapi.log.debug(`Migrate passengers for car ${car.id}`);
    await strapi.services.car.update({id: car.id}, {passengers});
  }

  strapi.log.debug('Done.');
  process.exit(0);
};

main();
