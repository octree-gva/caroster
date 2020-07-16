const _ = require('lodash');

module.exports = {
  /**
   * Update a record.
   *
   * @return {Object}
   */
  update: async ctx => {
    console.log('I AM HEREE');
    const advancedConfigs = await strapi
      .store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'advanced',
      })
      .get();

    const {id} = ctx.params;
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      events = [],
    } = ctx.request.body;

    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    if (_.has(ctx.request.body, 'email') && !email) {
      return ctx.badRequest('email.notNull');
    }

    if (_.has(ctx.request.body, 'firstName') && !firstName) {
      return ctx.badRequest('firstName.notNull');
    }

    if (_.has(ctx.request.body, 'lastName') && !lastName) {
      return ctx.badRequest('lastName.notNull');
    }

    if (_.has(ctx.request.body, 'username') && !username) {
      return ctx.badRequest('username.notNull');
    }

    if (
      _.has(ctx.request.body, 'password') &&
      !password &&
      user.provider === 'local'
    ) {
      return ctx.badRequest('password.notNull');
    }

    if (_.has(ctx.request.body, 'username')) {
      const userWithSameUsername = await strapi
        .query('user', 'users-permissions')
        .findOne({username});

      if (userWithSameUsername && userWithSameUsername.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.username.taken',
            message: 'username.alreadyTaken.',
            field: ['username'],
          })
        );
      }
    }

    if (_.has(ctx.request.body, 'email') && advancedConfigs.unique_email) {
      const userWithSameEmail = await strapi
        .query('user', 'users-permissions')
        .findOne({email});

      if (userWithSameEmail && userWithSameEmail.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.email.taken',
            message: 'Email already taken',
            field: ['email'],
          })
        );
      }
    }

    let updateData = {
      ...ctx.request.body,
    };

    if (_.has(ctx.request.body, 'password') && password === user.password) {
      delete updateData.password;
    }

    if (!_.has(ctx.request.body, 'events')) {
      updateData.events = [];
    }

    const data = await strapi.plugins['users-permissions'].services.user.edit(
      {id},
      updateData
    );

    ctx.send({...data});
  },
};
