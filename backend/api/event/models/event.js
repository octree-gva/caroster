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
      if (!event.uuid) {
        event.uuid = uuid.v4();
      }

      // If user provides an address, get its lat/lng position using OSM API
      if (event.address) {
        const query = encodeURI(event.address);
        try {
          const {data} = await axios.get(
            ` https://nominatim.openstreetmap.org/search?format=json&q=${query}`
          );
          if (Array.isArray(data) && data.length > 0) {
            const [entity] = data;
            event.position = [entity.lat, entity.lon];
          } else
            strapi.log.info(
              `No location from Nominatim API for ${event.address}`
            );
        } catch (error) {
          strapi.log.error(error);
        }
      }

      // If user accepts newsletters, subscribe it
      if (event.newsletter) sendgrid.subscribe(event.email);
    },
    async beforeUpdate(params, event) {
      const eventInDb = await strapi.services.event.findOne(params);

      if (!eventInDb.uuid) {
        event.uuid = uuid.v4();
      }

      if (event.address) {
        const query = encodeURI(event.address);
        try {
          const {data} = await axios.get(
            ` https://nominatim.openstreetmap.org/search?format=json&q=${query}`
          );
          if (Array.isArray(data) && data.length > 0) {
            const [entity] = data;
            event.position = [entity.lat, entity.lon];
          } else
            strapi.log.info(
              `No location from Nominatim API for ${event.address}`
            );
        } catch (error) {
          strapi.log.error(error);
        }
      }
    },

    async afterCreate(event) {
      try {
        await strapi.plugins[
          'email-designer'
        ].services.email.sendTemplatedEmail(
          {
            to: event.email,
          },
          {
            templateId: 1,
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
    },
  },
};
