// @ts-nocheck
import { DateTime } from "luxon";
import { factories } from "@strapi/strapi";

const TEMPLATE_NAME_RECAP = "event_recap";
const { STRAPI_URL = "" } = process.env;

export default factories.createCoreService(
  "api::event.event",
  ({ strapi }) => ({
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
                waitingPassengersCount: event.waitingPassengers?.length || 0,
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
  })
);
