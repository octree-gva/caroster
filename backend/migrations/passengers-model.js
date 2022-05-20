/**
 * Migrate passengers components to passengers model
 * for event waiting list & travel passengers
 *
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
    const {waitingList} = event;

    if (!waitingList || waitingList.length === 0) continue;

    for (let j = 0; j < waitingList.length; j++) {
      const passengerCompo = waitingList[j];
      const passengerModel = await strapi.services.passenger.create({
        name: passengerCompo.name,
        email: passengerCompo.email,
        location: passengerCompo.location,
        user: passengerCompo.user?.id,
        event: event.id,
      });
      console.log(passengerModel);
    }
  }

  /**
   * Migrate travel passengers
   */
  const travels = await strapi.services.travel.find({_limit: -1});
  for (let i = 0; i < travels.length; i++) {
    const travel = travels[i];
    const {passengers} = travel;

    if (!passengers || passengers.length === 0) continue;

    for (let j = 0; j < passengers.length; j++) {
      const passengerCompo = passengers[j];
      const passengerModel = await strapi.services.passenger.create({
        name: passengerCompo.name,
        email: passengerCompo.email,
        location: passengerCompo.location,
        user: passengerCompo.user?.id,
        travel: travel.id,
      });
      console.log(passengerModel);
    }
  }

  strapi.log.debug('Done.');
  process.exit(0);
};

main();
