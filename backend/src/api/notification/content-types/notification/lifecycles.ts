export default {
  async afterCreate({ params, result }) {
    const userId = params?.data?.user;

    if (userId) {
      const notification = await strapi.entityService.findOne(
        "api::notification.notification",
        result.id,
        {
          populate: ["user", "event"],
        }
      );
      const { user, event } = notification;
      await strapi
        .service("api::email.email")
        .sendEmailNotif(user.email, notification.type, user.lang, {
          user,
          event,
        });
    }
  },
};
