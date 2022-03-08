'use strict';
const moment = require('moment');
const _pick = require('lodash/pick');

const TEMPLATE_NAME_RECAP = 'event_recap';
const PUBLIC_FIELDS = [
  'id',
  'uuid',
  'name',
  'description',
  'email',
  'id',
  'date',
  'address',
  'position',
  'waitingList',
  'travels',
  'created_at',
  'updated_at',
];

const {STRAPI_URL = ''} = process.env;

module.exports = {
  sanitize: event => {
    const waitingList = event?.waitingList?.map(list =>
      _pick(list, ['id', 'name', 'location', 'user'])
    );
    const sanitizedEvent = _pick(event, PUBLIC_FIELDS);
    return {...sanitizedEvent, waitingList};
  },

  sendDailyRecap: async event => {
    const referenceDate = moment().subtract(1, 'day');
    const hasBeenModified = referenceDate.isSameOrBefore(event.updated_at);
    if (hasBeenModified) {
      strapi.log.debug(
        `Send daily recap to ${event.email} for event #${event.id}`
      );
      const newTravels = event.travels?.filter(travel =>
        referenceDate.isSameOrBefore(travel.created_at)
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
          },
          {
            event,
            eventLink: `${STRAPI_URL}/e/${event.uuid}`,
            waitingListCount: event.waitingList?.length || 0,
            travelsCount: event.travels?.length || 0,
            newTravelsCount: newTravels?.length || 0,
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
