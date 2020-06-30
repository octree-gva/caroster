"use strict";
const axios = require("axios");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(event) {
      if (!!event.address) {
        const query = encodeURI(event.address);
        try {
          const { data } = await axios.get(
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
    async beforeUpdate(params, event) {
      if (!!event.address) {
        const query = encodeURI(event.address);
        try {
          const { data } = await axios.get(
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
  },
};
