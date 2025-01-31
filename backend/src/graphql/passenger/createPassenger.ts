import pMap from "p-map";
import moment from "moment";

const createPassenger = {
  description: "Create a passenger",
  async resolve(_root, args) {
    const { data: passengerInput } = args;
    const { user: userId, event: eventId } = passengerInput;

    //Avoid duplicity when the connected users add themself
    if (userId) {
      const userPassengersInEvent = (await strapi.entityService.findMany(
        "api::passenger.passenger",
        {
          filters: {
            event: { id: eventId },
            user: { id: userId },
          },
        }
      )) as { id: string }[];

      // Delete existing passenger linked to the user in targeted event
      await pMap(
        userPassengersInEvent,
        async (passenger) =>
          strapi.entityService.delete("api::passenger.passenger", passenger.id),
        { concurrency: 5 }
      );
    }

    const createdPassenger = await strapi.entityService.create(
      "api::passenger.passenger",
      {
        data: passengerInput,
        populate: {
          event: true,
          user: true,
          travel: {
            populate: {
              user: true,
            },
          },
        },
      }
    );

    // If event is Caroster Plus, send notification to user
    const enabledModules = createdPassenger.event?.enabled_modules as string[];
    const isCarosterPlus = enabledModules?.includes("caroster-plus");
    if (isCarosterPlus && createdPassenger.user) {
      const travel = createdPassenger.travel;
      const driver = travel.user;
      const date = travel.departureDate
        ? moment(travel.departureDate)
            .locale(createdPassenger.user.lang || "en")
            .format("dddd LL")
        : "";
      const datetime = `${date} ${travel.departureTime || ""}`;
      try {
        const vehicleName =
          travel.firstname && travel.lastname
            ? `${travel.firstname} ${travel.lastname[0]}.`
            : travel.vehicleName;
        await strapi.entityService.create("api::notification.notification", {
          data: {
            type: "ContactTripCreator",
            event: createdPassenger.event.id,
            user: createdPassenger.user.id,
            // @ts-expect-error
            payload: { travel, driver, datetime, vehicleName },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }

    const { toEntityResponse } = strapi
      .plugin("graphql")
      .service("format").returnTypes;

    return toEntityResponse(createdPassenger, {
      args,
      resourceUID: "api::passenger.passenger",
    });
  },
};

export default createPassenger;
