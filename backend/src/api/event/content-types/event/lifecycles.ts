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
  },
};
