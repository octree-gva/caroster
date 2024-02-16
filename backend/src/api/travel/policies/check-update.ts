import { errors } from "@strapi/utils";

export default async (policyContext, _config, { strapi }) => {
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

  const eventId = policyContext.args?.data?.event;
  if (!!eventId && eventId !== event.id)
    throw new errors.UnauthorizedError("Can't change travel linked event");

  if (event.enabled_modules?.includes("caroster-plus")) {
    const user = policyContext.state.user;
    if (!user) throw new errors.ForbiddenError();

    const admins = event.administrators?.split(/, ?/) || [];
    const isAdmin = [...admins, event.email].includes(user.email);

    if (isAdmin) return true;
    else if (travel.user?.email === user.email) return true;
    else return false;
  }
};
