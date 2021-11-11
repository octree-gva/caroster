'use strict';

const _uniq = require('lodash/uniq');

const {STRAPI_URL = ''} = process.env;

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      sendEmailsToWaitingList(result);
    },
  },
};

const sendEmailsToWaitingList = async car => {
  const event = car.event;
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
          car,
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
