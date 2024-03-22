import bootstrapActions from "./bootstrap";
import graphqlExtends from "./graphql";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(context) {
    graphqlExtends(context);

    // Because of bug https://github.com/strapi/strapi/issues/17995, we're forced
    // to enable "plugin::users-permissions.user" permission for Authenticated role.
    context.strapi.controller("plugin::users-permissions.user").find = (ctx) =>
      ctx.unauthorized();
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(context) {
    for (let action of bootstrapActions) {
      await action(context);
    }
  },
};
