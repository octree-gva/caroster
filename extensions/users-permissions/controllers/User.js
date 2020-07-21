const {removeUndefined, sanitizeEntity} = require('strapi-utils');

const formatError = error => [
  {messages: [{id: error.id, message: error.message, field: error.field}]},
];

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
      old_password,
      firstName,
      lastName,
      events,
    } = ctx.request.body;

    if (password) {
      const validPassword = strapi.plugins[
        'users-permissions'
      ].services.user.validatePassword(old_password, user.password);
      if (!validPassword)
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.password.matching',
            message: 'Passwords do not match.',
          })
        );

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
