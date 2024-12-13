import { errors } from "@strapi/utils";

export default async (policyContext, _config, { strapi }) => {
  const passengerId = policyContext.args?.id;
  const passenger = await strapi.entityService.findOne(
    "api::passenger.passenger",
    passengerId,
    {
      populate: {
        event: true,
        user: true,
        travel: {
          populate: ["user"],
        },
      },
    }
  );

  if (!passenger) throw new errors.NotFoundError("Passenger not found");

  const event = passenger.event;

  if (event.enabled_modules?.includes("caroster-plus")) {
    const user = policyContext.state.user;
    if (!user) throw new errors.ForbiddenError();
    else if (!passenger.user) return true;

    const admins = event.administrators?.split(/, ?/) || [];
    const isAdmin = [...admins, event.email].includes(user.email);
    const isDriver = passenger.travel?.user?.id === user.id;

    // If remove self
    if (passenger.user.id == user.id) return true;
    else if (isDriver || isAdmin) {
      const travel = passenger.travel;
      const vehicleName =
        travel.firstname && travel.lastname
          ? `${travel.firstname} ${travel.lastname[0]}.`
          : travel.vehicleName;
      await strapi.entityService.create("api::notification.notification", {
        data: {
          type: "DeletedFromTrip",
          event: event.id,
          user: passenger.user.id,
          payload: { travel, vehicleName },
        },
      });
      return true;
    } else return false;
  }
};
