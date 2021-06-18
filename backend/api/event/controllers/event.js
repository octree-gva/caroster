'use strict';

const {sanitizeEntity} = require('strapi-utils');

module.exports = {
  async create(ctx) {
    let event = ctx.request.body;
    const user = ctx.state.user;

    if (user) event = {...event, users: [user.id]};

    const entity = await strapi.services.event.create(event);
    return sanitizeEntity(entity, {model: strapi.models.event});
  },
};
