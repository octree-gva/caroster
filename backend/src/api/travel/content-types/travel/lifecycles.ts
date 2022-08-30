import _uniq from "lodash/uniq";

const { STRAPI_URL = "" } = process.env;

export default {
  async afterCreate({ result, params }) {
    const eventId = params?.data?.event;
    if (eventId) sendEmailsToWaitingPassengers(result, eventId);
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
    const overflowPassengers = passengers.slice(seats);
    if (overflowPassengers.length > 0) {
      await Promise.all(
        overflowPassengers.map(movePassengerToWaitingList(event.id))
      );
      strapi.log.info(
        `${overflowPassengers.length} passengers moved to event ${event.id} waiting list`
      );
    }
  },

  async beforeDelete({ params }) {
    const travel = await strapi.db
      .query("api::travel.travel")
      .findOne({ ...params, populate: { event: true, passengers: true } });

    // Move travel's passengers to event's waiting list
    if (travel?.passengers?.length > 0) {
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
    populate: ["waitingPassengers"],
  });
  const eventWaitingPassengers = event?.waitingPassengers || [];
  const userEmails = eventWaitingPassengers
    .map((user) => user.email)
    .filter(Boolean);

  const templateName = "waitinglist_notif";
  const template = await strapi
    .plugin("email-designer")
    .services.template.findOne({
      name: templateName,
    });

  if (!template) {
    strapi.log.error(`No email template with name ${templateName}`);
    return null;
  }

  if (userEmails?.length > 0)
    try {
      await strapi.plugin("email-designer").services.email.sendTemplatedEmail(
        {
          to: _uniq(userEmails),
        },
        {
          templateReferenceId: template.templateReferenceId,
        },
        {
          event,
          travel,
          eventLink: `${STRAPI_URL}/e/${event.uuid}`,
        }
      );
      strapi.log.info(
        `Email with template '${templateName}' sent to ${userEmails.length} addresses`
      );
    } catch (error) {
      console.error(error);
      strapi.log.error(
        `Impossible to send email waiting list notification for event #${
          event.id
        }. Error: ${JSON.stringify(error)}`
      );
    }
};

const movePassengerToWaitingList = (eventId: string) => async (passenger) =>
  strapi.entityService.update("api::passenger.passenger", passenger.id, {
    data: {
      travel: null,
      event: eventId,
    },
  });
