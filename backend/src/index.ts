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

    // Disable /users find REST endpoint
    context.strapi.controller("plugin::users-permissions.user").find = () => {};
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
