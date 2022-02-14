'use strict';

const _uniq = require('lodash/uniq');

const {STRAPI_URL = ''} = process.env;

module.exports = {
  lifecycles: {
    async beforeUpdate(query, update) {
      const travel = await strapi.services.travel.findOne(query);
      if (update.passengers && travel?.vehicle) {
        if (travel?.vehicle?.seats < update.passengers.length)
          throw new Error('no_enough_seats');
      }
    },

    async afterCreate(result) {
      sendEmailsToWaitingList(result);
    },
  },
};

const sendEmailsToWaitingList = async travel => {
  const event = travel.event;
  const eventWaitingList = event?.waitingList || [];
  const userEmails = eventWaitingList.map(user => user.email).filter(Boolean);
  const templateId = await strapi.plugins[
    'email-designer'
  ].services.template.getId('waitinglist_notif');

  if (userEmails?.length > 0)
    try {
      await strapi.plugins['email-designer'].services.email.sendTemplatedEmail(
        {
          to: _uniq(userEmails),
        },
        {
          templateId,
        },
        {
          event,
          travel,
          eventLink: `${STRAPI_URL}/e/${event.uuid}`,
        }
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
