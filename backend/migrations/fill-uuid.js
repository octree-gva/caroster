/**
 * Until v0.4, events have no UUID.
 * This migration script set one to each existing events
 */

const Strapi = require('strapi');

const main = async () => {
  await Strapi().load();

  const events = await strapi.services.event.find({_limit: -1});

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    strapi.log.debug(`Set UUID for event ${event.id}`);
    await strapi.services.event.update({id: event.id}, {uuid: event.id});
  }

  strapi.log.debug('Done.');
  process.exit(0);
};

main();
