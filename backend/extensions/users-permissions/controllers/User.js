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

    const body = ctx.request.body.input || ctx.request.body;
    const {
      username,
      email,
      password,
      old_password,
      firstName,
      lastName,
      events,
    } = body;

    if (password) {
      const validPassword = await strapi.plugins[
        'users-permissions'
      ].services.user.validatePassword(old_password, user.password);
      if (!validPassword) throw new Error('Auth.form.error.password.matching');

      delete ctx.request.body.old_password;
    }

    const data = await strapi.plugins['users-permissions'].services.user.edit(
      {id: user.id},
      removeUndefined({
        username,
        email,
        password,
        firstName,
        lastName,
        events,
      })
    );

    ctx.send({user: data});
  },

  /**
   * Retrieve authenticated user.
   * @return {Object}
   */
  async me(ctx) {
    if (!ctx.state.user) throw new Error('no_user');

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
    ctx.send({...ctx.state.user, profile: data});
  },
};
