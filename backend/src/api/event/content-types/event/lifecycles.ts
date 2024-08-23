import axios from "axios";
import { v4 as uuid } from "uuid";

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    if (!data.uuid) data.uuid = uuid();

    const userCreator = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { email: data.email },
      });

    if (userCreator) {
      data.creator = userCreator.id;
      data.users = [userCreator.id];
    }

    // If user provides an address, get its lat/lng position using OSM API
    if (data.address) data.position = await getPosition(data.address);
  },
  async afterCreate({ result }) {
    await strapi
      .service("api::email.email")
      .sendEmailNotif(result.email, "EventCreated", result.lang, {
        event: result,
      });
  },

  async beforeUpdate(event) {
    const { params } = event;
    const eventInDb = await strapi.db.query("api::event.event").findOne(params);
    if (eventInDb && !eventInDb.uuid) params.data.uuid = uuid();
    if (params.data.address && !params.data.position)
      params.data.position = getPosition(params.data.address);
  },
};

const getPosition = async (address: string): Promise<[string, string]> => {
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
