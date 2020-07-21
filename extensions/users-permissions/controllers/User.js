const {removeUndefined, sanitizeEntity} = require('strapi-utils');

module.exports = {
  /**
   * Update authenticated user.
   *
   * @return {Object}
   */
  updateMe: async ctx => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        {messages: [{id: 'No authorization header was found'}]},
      ]);
    }

    const {
      username,
      email,
      password,
      firstname,
      lastname,
      events,
    } = ctx.request.body;

    const data = await strapi.plugins['users-permissions'].services.user.edit(
      {id: user.id},
      removeUndefined({
        username,
        email,
        password,
        firstname,
        lastname,
        events,
      })
    );

    ctx.send(data);
  },

  /**
   * Retrieve authenticated user.
   * @return {Object}
   */
  async me(ctx) {
    const {id} = ctx.state.user;

    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    if (!user) {
      return ctx.badRequest(null, [
        {messages: [{id: 'No authorization header was found'}]},
      ]);
    }
    const data = sanitizeEntity(user, {
      model: strapi.query('user', 'users-permissions').model,
    });
    ctx.send(data);
  },
};
