'use strict';

module.exports = {
  async findOne(ctx) {
    const uuid = ctx.params._uuid || ctx.params.uuid;
    const event = await strapi.services.event.findOne({uuid});
    if (event) return strapi.services.event.sanitize(event);
    else return ctx.badRequest('No event found');
  },

  async create(ctx) {
    let event = ctx.request.body;
    const user = ctx.state.user;

    if (user) event = {...event, users: [user.id]};

    const entity = await strapi.services.event.create(event);
    return strapi.services.event.sanitize(entity);
  },

  async update(ctx) {
    const uuid = ctx.params._uuid || ctx.params.uuid;
    const eventUpdate = ctx.request.body;

    try {
      const updatedEvent = await strapi.services.event.update(
        {uuid},
        eventUpdate
      );
      return strapi.services.event.sanitize(updatedEvent);
    } catch (error) {
      return ctx.badRequest('No event found');
    }
  },
};
