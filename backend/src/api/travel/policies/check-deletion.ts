import { errors } from "@strapi/utils";

export default async (policyContext, config, { strapi }) => {
  const travelId = policyContext.args?.id;
  const travel = await strapi.entityService.findOne(
    "api::travel.travel",
    travelId,
    {
      populate: ["event", "user"],
    }
  );

  if (!travel) throw new errors.NotFoundError(`Travel not found`);

  const event = travel.event;

  if (event.enabled_modules?.includes("caroster-plus")) {
    const user = policyContext.state.user;
    if (!user) throw new errors.ForbiddenError();

    const admins = event.administrators?.split(/, ?/) || [];
    const isAdmin = [...admins, event.email].includes(user.email);

    if (isAdmin) {
      await strapi.entityService.create("api::notification.notification", {
        data: {
          type: "DeletedYourTrip",
          event,
          user: travel.user,
          payload: { travel },
        },
      });
      return true;
    } else if (travel.user?.email === user.email) return true;
    else return false;
  }
};
