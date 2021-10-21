'use strict';
const moment = require('moment');

const TEMPLATE_NAME_RECAP = 'event_recap';

const {STRAPI_URL = ''} = process.env;

module.exports = {
  sendDailyRecap: async event => {
    const referenceDate = moment().subtract(1, 'day');
    const hasBeenModified = referenceDate.isSameOrBefore(event.updated_at);
    if (hasBeenModified) {
      strapi.log.debug(
        `Send daily recap to ${event.email} for event #${event.id}`
      );
      const newCars = event.cars?.filter(car =>
        referenceDate.isSameOrBefore(car.created_at)
      );
      try {
        const templateId = await strapi.plugins[
          'email-designer'
        ].services.template.getId(TEMPLATE_NAME_RECAP);
        await strapi.plugins[
          'email-designer'
        ].services.email.sendTemplatedEmail(
          {
            to: event.email,
          },
          {
            templateId,
            subject: `Caroster: ${event.name}`,
          },
          {
            eventName: event.name,
            eventLink: `${STRAPI_URL}/e/${event.uuid}`,
            waitingListCount: event.waitingList?.length || 0,
            carsCount: event.cars?.length || 0,
            newCarsCount: newCars?.length || 0,
          }
        );
      } catch (error) {
        console.error(error);
        strapi.log.error(
          `Impossible to send recap notification to ${event.email} for event #${
            event.id
          }. Error: ${JSON.stringify(error)}`
        );
      }
    }
  },
};
