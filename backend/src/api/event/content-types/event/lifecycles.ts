import { v4 as uuid } from "uuid";
import moment from "moment";
import _pick from "lodash/pick";

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
    if (!result.isReturnEvent && !result.unpaid)
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

  async afterUpdate({ params, result }) {
    const eventInDb = await strapi.entityService.findOne(
      "api::event.event",
      result.id,
      { populate: ["linkedEvent"] }
    );
    if (
      eventInDb.linkedEvent &&
      !moment(eventInDb.linkedEvent.updatedAt).isSame(
        eventInDb.updatedAt,
        "second"
      )
    ) {
      const update = _pick(params.data, [
        "name",
        "email",
        "date",
        "address",
        "description",
        "latitude",
        "longitude",
        "enabled_modules",
        "lang",
        "administrators",
      ]);
      await strapi.entityService.update(
        "api::event.event",
        eventInDb.linkedEvent.id,
        {
          data: update,
        }
      );
    }
  },
};
