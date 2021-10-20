'use strict';
const axios = require('axios');
const moment = require('moment');
const uuid = require('uuid');
const sendgrid = require('../../../lib/sendgrid');
require('moment/locale/fr-ch');

const {STRAPI_URL = ''} = process.env;

module.exports = {
  lifecycles: {
    async beforeCreate(event) {
      if (!event.uuid) event.uuid = uuid.v4();
      // If user provides an address, get its lat/lng position using OSM API
      if (event.address) event.position = getPosition(event.address);
      // If user accepts newsletters, subscribe it
      if (event.newsletter) sendgrid.subscribe(event.email);
    },
    async afterCreate(event) {
      sendEmailToCreator(event);
    },

    async beforeUpdate(params, event) {
      const eventInDb = await strapi.services.event.findOne(params);
      if (!eventInDb.uuid) event.uuid = uuid.v4();
      if (event.address) event.position = getPosition(event.address);
    },
  },
};

const getPosition = async address => {
  try {
    const query = encodeURI(address);
    const {data} = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    if (Array.isArray(data) && data.length > 0) {
      const [entity] = data;
      return [entity.lat, entity.lon];
    } else strapi.log.info(`No location from Nominatim API for ${address}`);
  } catch (error) {
    strapi.log.error(error);
  }
};

const sendEmailToCreator = async event => {
  try {
    const templateId = getTemplateId('creator_notif');
    await strapi.plugins['email-designer'].services.email.sendTemplatedEmail(
      {
        to: event.email,
      },
      {
        templateId,
        subject: `Caroster: ${event.name}`,
      },
      {
        eventName: event.name,
        eventTime: event.date
          ? moment(event.date).format('dddd D MMMM YYYY')
          : null,
        eventAddress: event.address,
        eventLink: `${STRAPI_URL}/e/${event.uuid}`,
      }
    );
  } catch (error) {
    console.error(error);
    strapi.log.error(
      `Impossible to send email notification to ${event.email} for event#${
        event.id
      }. Error: ${JSON.stringify(error)}`
    );
  }
};

const getTemplateId = async templateName => {
  const template = await strapi.plugins[
    'email-designer'
  ].services.template.fetch({name: templateName});
  if (!template) throw new Error(`No email template with name ${templateName}`);
  return template.id;
};
