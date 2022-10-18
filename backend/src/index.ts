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

    // Disable REST endpoints
    context.strapi.controller("api::event.event").find = (ctx) =>
      ctx.unauthorized();
    context.strapi.controller("api::passenger.passenger").find = (ctx) =>
      ctx.unauthorized();
    context.strapi.controller("api::travel.travel").find = (ctx) =>
      ctx.unauthorized();
    context.strapi.controller("api::vehicle.vehicle").find = (ctx) =>
      ctx.unauthorized();
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
