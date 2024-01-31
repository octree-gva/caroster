export default {
  async afterCreate({ params }) {
    if (params.data.travel) {
      const travel = await strapi.entityService.findOne(
        "api::travel.travel",
        params.data.travel,
        {
          populate: ["user"],
        }
      );
      if (travel)
        strapi.entityService.create("api::notification.notification", {
          data: {
            type: "NewTrip",
            event: params.data.event,
            user: travel.user?.id,
          },
        });
    }
  },
};
