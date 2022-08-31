import axios from "axios";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";

const { STRAPI_URL = "" } = process.env;

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    if (!data.uuid) data.uuid = uuid();
    // If user provides an address, get its lat/lng position using OSM API
    if (data.address) data.position = getPosition(data.address);
  },
  async afterCreate(event) {
    sendEmailToCreator(event.result);
  },

  async beforeUpdate(event) {
    const { params } = event;
    const eventInDb = await strapi.db.query("api::event.event").findOne(params);
    if (eventInDb && !eventInDb.uuid) params.data.uuid = uuid();
    if (params.data.address && !params.data.position)
      params.data.position = getPosition(params.data.address);
  },
};

const getPosition = async (address) => {
  try {
    const query = encodeURI(address);
    const { data } = await axios.get(
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

const sendEmailToCreator = async (event) => {
  try {
    const templateName = "creator_notif";
    const template = await strapi
      .plugin("email-designer")
      .services.template.findOne({
        name: templateName,
      });

    if (!template) {
      strapi.log.error(`No email template with name ${templateName}`);
      return null;
    }

    await strapi.plugin("email-designer").services.email.sendTemplatedEmail(
      {
        to: event.email,
      },
      {
        templateReferenceId: template.templateReferenceId,
      },
      {
        event,
        eventTime: event.date
          ? DateTime.fromISO(event.date).format("dddd D MMMM YYYY")
          : null,
        eventLink: `${STRAPI_URL}/e/${event.uuid}`,
      }
    );
    strapi.log.info(
      `Email with template '${templateName}' sent to ${event.email}`
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
