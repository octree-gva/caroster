// @ts-nocheck
import { DateTime } from "luxon";
import { factories } from "@strapi/strapi";

const TEMPLATE_NAME_RECAP = "event_recap";
const TEMPLATE_NAME_END_EVENT = "event_end";
const { STRAPI_URL = "" } = process.env;

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
        populate: ["passengers", "passengers.travel"],
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
        try {
          const template = await strapi
            .plugin("email-designer")
            .services.template.findOne({
              name: TEMPLATE_NAME_RECAP,
            });

          if (!template) {
            strapi.log.error(
              `No email template with name ${TEMPLATE_NAME_RECAP}`
            );
            return null;
          }

          const waitingPassengers = await strapi
            .service("api::event.event")
            .getWaitingPassengers(event);

          await strapi
            .service("plugin::email-designer.email")
            .sendTemplatedEmail(
              {
                to: event.email,
              },
              {
                templateReferenceId: template.templateReferenceId,
              },
              {
                event,
                eventLink: `${STRAPI_URL}/e/${event.uuid}`,
                waitingListCount: waitingPassengers?.length || 0,
                travelsCount: event.travels?.length || 0,
                newTravelsCount: newTravels?.length || 0,
              }
            );
          strapi.log.info(
            `Email with template '${TEMPLATE_NAME_RECAP}' sent to ${event.email}`
          );
        } catch (error) {
          console.error(error);
          strapi.log.error(
            `Impossible to send recap notification to ${
              event.email
            } for event #${event.id}. Error: ${JSON.stringify(error)}`
          );
        }
      }
    },

    sendEndRecap: async (event) => {
      try {
        const template = await strapi
          .plugin("email-designer")
          .services.template.findOne({
            name: TEMPLATE_NAME_END_EVENT,
          });

        if (!template) {
          strapi.log.error(
            `No email template with name ${TEMPLATE_NAME_END_EVENT}`
          );
          return null;
        }

        const travelsCount = event.travels?.length || 0;
        const passengersCount = event.passengers?.filter(
          (passenger) => passenger.travel
        ).length;

        await strapi.service("plugin::email-designer.email").sendTemplatedEmail(
          {
            to: event.email,
          },
          {
            templateReferenceId: template.templateReferenceId,
          },
          {
            event,
            travelsCount,
            passengersCount,
            eventLink: `${STRAPI_URL}/e/${event.uuid}`,
          }
        );
        strapi.log.info(
          `Email with template '${TEMPLATE_NAME_END_EVENT}' sent to ${event.email}`
        );
      } catch (error) {
        console.error(error);
        strapi.log.error(
          `Impossible to send end event notification to ${
            event.email
          } for event #${event.id}. Error: ${JSON.stringify(error)}`
        );
      }
    },
  })
);
