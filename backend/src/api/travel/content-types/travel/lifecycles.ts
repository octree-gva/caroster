import _uniq from "lodash/uniq";
import pMap from "p-map";

export default {
  async afterCreate({ result, params }) {
    const eventId = params?.data?.event;

    const event = await strapi.entityService.findOne(
      "api::event.event",
      eventId
    );
    if (!event)
      throw new Error("Try to create a travel not linked to an existing event");

    const enabledModules = event.enabled_modules as String[];
    const isEventCarosterPlus = enabledModules?.includes("caroster-plus");

    if (isEventCarosterPlus)
      strapi
        .service("api::trip-alert.trip-alert")
        .sendTripAlerts(eventId, result);
    else sendEmailsToWaitingPassengers(result, eventId);
  },

  async beforeUpdate(event) {
    const { params } = event;
    const travel = await strapi.db.query("api::travel.travel").findOne(params);

    // On passengers update, check if travel has enough seats
    if (params.data.passengers)
      if (travel?.seats < params.data.passengers.length)
        throw new Error("no_enough_seats");
  },

  async afterUpdate({ result }) {
    const { passengers = [], seats, event } = result;

    // If count of seats is updated, move passengers excedent to event's waiting list
    const overflowPassengers = passengers.slice?.(seats);
    if (overflowPassengers?.length > 0) {
      await Promise.all(
        overflowPassengers.map(movePassengerToWaitingList(event.id))
      );
      strapi.log.info(
        `${overflowPassengers.length} passengers moved to event ${event.id} waiting list`
      );
    }
  },

  async beforeDelete({ params }) {
    const travel = await strapi.entityService.findOne(
      "api::travel.travel",
      params.where?.id,
      {
        populate: {
          event: true,
          passengers: {
            populate: ["user"],
          },
        },
      }
    );
    if (!travel) return;

    const hasPassengers = travel?.passengers?.length > 0;
    const enabledModules = travel.event?.enabled_modules as String[];
    const isEventCarosterPlus = enabledModules?.includes("caroster-plus");

    // If Caroster Plus, send notification to passengers
    if (isEventCarosterPlus && hasPassengers) {
      const users = travel.passengers
        .map((passenger) => passenger.user)
        .filter(Boolean);

      const vehicleName =
        travel.firstname && travel.lastname
          ? `${travel.firstname} ${travel.lastname[0]}.`
          : travel.vehicleName;
      await pMap(
        users,
        async (user) =>
          strapi.entityService.create("api::notification.notification", {
            data: {
              type: "DeletedTrip",
              event: travel.event.id,
              user: user.id,
              // @ts-expect-error
              payload: { travel, vehicleName },
            },
          }),
        { concurrency: 5 }
      );
    }
    // Move travel's passengers to event's waiting list
    else if (hasPassengers) {
      const { passengers = [] } = travel;
      await Promise.all(
        passengers.map(movePassengerToWaitingList(travel.event.id))
      );
      strapi.log.info(
        `${passengers.length} passengers moved to event ${travel.event.id} waiting list`
      );
    }
  },
};

const sendEmailsToWaitingPassengers = async (travel, eventId: string) => {
  const event = await strapi.db.query("api::event.event").findOne({
    where: { id: eventId },
  });
  const eventWaitingPassengers = await strapi
    .service("api::event.event")
    .getWaitingPassengers(event);

  const vehicleName =
    travel.firstname && travel.lastname
      ? `${travel.firstname} ${travel.lastname[0]}.`
      : travel.vehicleName;

  // Create notification entities for people linked to a registered user
  try {
    const registeredUsers = eventWaitingPassengers
      .map((passenger) => passenger.user)
      .filter(Boolean);

    await pMap(
      registeredUsers,
      async (user: { id: string }) =>
        strapi.entityService.create("api::notification.notification", {
          data: {
            type: "NewTrip",
            event: eventId,
            user: user.id,
            payload: { travel, vehicleName },
          },
        }),
      { concurrency: 5 }
    );
  } catch (error) {
    strapi.log.error(
      "Error while creating notifications for registered users:"
    );
    console.error(error);
  }

  // Send email notification to anonymous passengers
  const anonymEmails: string[] = eventWaitingPassengers
    .filter((passenger) => !passenger.user)
    .map((user) => user.email)
    .filter(Boolean);
  await pMap(
    anonymEmails,
    async (email) =>
      strapi
        .service("api::email.email")
        .sendEmailNotif(email, "NewTrip", event.lang || "en", {
          event,
          travel,
          vehicleName,
        }),
    { concurrency: 5 }
  );
};

const movePassengerToWaitingList =
  (eventId: string | number) => async (passenger) =>
    strapi.entityService.update("api::passenger.passenger", passenger.id, {
      data: {
        travel: null,
        event: eventId,
      },
    });
