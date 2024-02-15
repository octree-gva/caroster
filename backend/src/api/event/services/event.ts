import { DateTime } from "luxon";
import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::event.event",
  ({ strapi }) => ({
    getWaitingPassengers: async (event) => {
      return strapi.entityService.findMany("api::passenger.passenger", {
        filters: {
          event: { id: event.id },
          travel: {
            id: {
              $null: true,
            },
          },
        },
        populate: ["travel", "user"],
      });
    },
    sendDailyRecap: async (event) => {
      const referenceDate = DateTime.now().minus({ day: 1 });
      const hasBeenModified =
        referenceDate <= DateTime.fromISO(event.updatedAt);
      if (hasBeenModified) {
        strapi.log.debug(
          `Send daily recap to ${event.email} for event #${event.id}`
        );
        const newTravels = event.travels?.filter(
          (travel) => referenceDate <= DateTime.fromISO(travel.createdAt)
        );
        const waitingPassengers = await strapi
          .service("api::event.event")
          .getWaitingPassengers(event);

        await strapi
          .service("api::email.email")
          .sendEmailNotif(event.email, "EventRecap", event.lang, {
            event,
            waitingListCount: waitingPassengers?.length || 0,
            travelsCount: event.travels?.length || 0,
            newTravelsCount: newTravels?.length || 0,
          });
      }
    },

    sendEndRecap: async (event) => {
      const travelsCount = event.travels?.length || 0;
      const passengersCount = event.passengers?.filter(
        (passenger) => passenger.travel
      ).length;
      await strapi
        .service("api::email.email")
        .sendEmailNotif(event.email, "EventEnded", event.lang, {
          event,
          travelsCount,
          passengersCount,
        });
    },
  })
);
