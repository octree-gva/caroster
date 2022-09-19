const createPassenger = {
  description: "Create a passenger",
  async resolve(_root, args) {
    const { data: passengerInput } = args;

    const { user: userId, travel: travelId } = passengerInput;

    try {
      //Avoid duplicity when the connected users add themself to a new car
      if (userId && travelId) {
        const travel = await strapi.entityService.findOne(
          "api::travel.travel",
          travelId,
          { populate: ["event"] }
        );

        const userPassengersIds = (
          await strapi.entityService.findMany("api::passenger.passenger", {
            filters: {
              user: userId,
            },
          })
        ).map((userPassenger) => userPassenger.id);

        const travelsIdsBelongingToUserInEvent = (
          await strapi.entityService.findMany("api::travel.travel", {
            filters: {
              event: travel.event.id,
              passengers: { id: { $containsi: userPassengersIds } },
            },
          })
        ).map((travel) => travel.id);

        const userDuplicatesinEvent = await strapi.entityService.findMany(
          "api::passenger.passenger",
          {
            filters: {
              $or: [
                {
                  event: travel.event.id,
                  user: userId,
                },
                {
                  travel: { id: { $in: travelsIdsBelongingToUserInEvent } },
                  user: userId,
                },
              ],
            },
          }
        );

        if (userDuplicatesinEvent.length > 0) {
          const [existingPassenger, ...duplicated] = userDuplicatesinEvent;

          await Promise.all(
            duplicated?.map(async (passenger) => {
              await strapi.entityService.delete(
                "api::passenger.passenger",
                passenger.id
              );
            })
          );

          return makeResponse({
            operation: strapi.entityService.update(
              "api::passenger.passenger",
              existingPassenger.id,
              { data: { ...passengerInput, event: null } }
            ),
            args,
          });
        }
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
