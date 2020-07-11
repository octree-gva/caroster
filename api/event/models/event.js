'use strict';
const axios = require('axios');
const moment = require('moment');
require('moment/locale/fr-ch');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(event) {
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
        strapi.plugins['sendgrid'].services.contacts.subscribe(event.email);
    },
    async beforeUpdate(params, event) {
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
      let eventTime = '';
      if (event.date) {
        eventTime = ', ' + moment(eventTime.date).format('dddd Do MMMM YYYY');
      }
      let eventAddress = '';
      if (event.address) {
        eventAddress = ', ' + event.address;
      }
      const {STRAPI_URL = ''} = process.env;

      try {
        await strapi.plugins['sendgrid'].services.email.send({
          to: event.email,
          from: 'caroster@octree.ch',
          templateId: 'd-a1b5043fb186411ea4b57ea956625093',
          dynamic_template_data: {
            eventName: event.name,
            eventTime,
            eventAddress,
            eventLink: `${STRAPI_URL}/e/${event.id}`,
          },
        });
      } catch (error) {
        strapi.log.error(
          `Impossible to send email notification to ${event.email} for event#${
            event.id
          }. Error: ${JSON.stringify(error)}`
        );
      }
    },
  },
};
