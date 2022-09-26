const Strapi = require("@strapi/strapi");

const main = async () => {
  const appContext = await Strapi.compile();
  await Strapi(appContext).load();

  const passengers = await strapi.entityService.findMany(
    "api::passenger.passenger",
    {
      limit: -1,
      populate: ["event", "travel", "travel.event"],
    }
  );

  const passengersWithoutEvent = passengers.filter(
    (passenger) => !passenger.event
  );

  for (const passenger of passengersWithoutEvent) {
    if (!passenger.travel)
      throw new Error(`Passenger ${passenger.id} has no travel and no event`);
    const eventId = passenger.travel.event?.id;
    if (!eventId)
      throw new Error(`Travel of passenger ${passenger.id} has no event`);
    await strapi.entityService.update(
      "api::passenger.passenger",
      passenger.id,
      {
        data: {
          event: eventId,
        },
      }
    );
    console.log(`Passenger ${passenger.id} linked to event ${eventId}`);
  }

  process.exit(0);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
