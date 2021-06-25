'use strict';
const axios = require('axios');
const moment = require('moment');
const uuid = require('uuid');
require('moment/locale/fr-ch');

const {STRAPI_URL = '', CAROSTER_TEMPLATEID_EVENTCREATION} = process.env;

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
      if (event.newsletter)
        try {
          strapi.plugins['email'].services.contact.subscribe({
            email: event.email,
          });
        } catch (error) {
          console.error(error);
          strapi.log.error(
            `Impossible to save email ${
              event.email
            } in contact list for event#${event.id}. Error: ${JSON.stringify(
              error
            )}`
          );
        }
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
        await strapi.plugins['email'].services.email.send({
          to: event.email,
          templateId: CAROSTER_TEMPLATEID_EVENTCREATION,
          templateData: {
            eventName: event.name,
            eventTime: event.date
              ? moment(event.date).format('dddd Do MMMM YYYY')
              : null,
            eventAddress: event.address,
            eventLink: `${STRAPI_URL}/e/${event.id}`,
          },
        });
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
