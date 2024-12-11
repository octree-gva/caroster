// @ts-nocheck
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::event.event",
  ({ strapi }) => ({
    async findOne(ctx) {
      const uuid = ctx.params.id;
      if (!uuid) throw new Error("No uuid provided");
      const event = await strapi.db
        .query("api::event.event")
        .findOne({ where: { uuid } });
      if (event) return this.sanitizeOutput(event, ctx);
      else return ctx.badRequest("No event found");
    },

    async create(ctx) {
      let eventData = ctx.request.body;
      const user = ctx.state.user;

      if (user) eventData = { ...eventData, users: [user.id] };

      const goEvent = await strapi.entityService.create("api::event.event", {
        data: eventData,
      });
      const returnEvent = await strapi.entityService.create(
        "api::event.event",
        {
          data: { ...eventData, isReturnEvent: true, linkedEvent: goEvent.id },
        }
      );
      await strapi.entityService.update("api::event.event", goEvent.id, {
        data: { linkedEvent: returnEvent.id },
      });
      return this.sanitizeOutput(goEvent, ctx);
    },
  })
);
