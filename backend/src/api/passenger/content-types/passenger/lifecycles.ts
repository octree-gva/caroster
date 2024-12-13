export default {
  async beforeCreate(event) {
    event.state.isAdmin = event.params.data.isAdmin;
  },
  async afterCreate({ params, state }) {
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
            type: "NewPassengerInYourTrip",
            event: params.data.event,
            user: travel.user?.id,
          },
        });

      if (travel && state.isAdmin) {
        const vehicleName =
          travel.firstname && travel.lastname
            ? `${travel.firstname} ${travel.lastname[0]}.`
            : travel.vehicleName;
        strapi.entityService.create("api::notification.notification", {
          data: {
            type: "AssignedByAdmin",
            event: params.data.event,
            user: params.data.user,
            // @ts-expect-error
            payload: { travel, vehicleName },
          },
        });
      }
    }
  },
};
