import pMap from "p-map";

const createPassenger = {
  description: "Create a passenger",
  async resolve(_root, args) {
    const { data: passengerInput } = args;
    const { user: userId, event: eventId } = passengerInput;

    try {
      //Avoid duplicity when the connected users add themself
      if (userId) {
        const userPassengersInEvent: { id: string }[] =
          await strapi.entityService.findMany("api::passenger.passenger", {
            filters: {
              event: { id: eventId },
              user: { id: userId },
            },
          });

        // Delete existing passenger linked to the user in targeted event
        await pMap(
          userPassengersInEvent,
          async (passenger) =>
            strapi.entityService.delete(
              "api::passenger.passenger",
              passenger.id
            ),
          { concurrency: 5 }
        );
      }

      return makeResponse({
        operation: await strapi.entityService.create(
          "api::passenger.passenger",
          {
            data: passengerInput,
          }
        ),
        args,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Couldn't create the passenger");
    }
  },
};

const makeResponse = async ({ operation, args }) => {
  const { toEntityResponse } = strapi
    .plugin("graphql")
    .service("format").returnTypes;

  return toEntityResponse(await operation, {
    args,
    resourceUID: "api::passenger.passenger",
  });
};

export default createPassenger;
