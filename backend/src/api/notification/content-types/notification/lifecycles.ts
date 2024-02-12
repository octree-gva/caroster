export default {
  async afterCreate({ params, result }) {
    const userId = params?.data?.user;

    if (userId) {
      const notification = await strapi.entityService.findOne(
        "api::notification.notification",
        result.id,
        {
          populate: {
            user: true,
            event: {
              populate: {
                travels: true,
                passengers: true,
              },
            },
          },
        }
      );
      const { user, event, payload = {} } = notification;
      await strapi
        .service("api::email.email")
        .sendEmailNotif(user.email, notification.type, user.lang, {
          user,
          event,
          ...(payload as object),
        });
    }
  },
};
