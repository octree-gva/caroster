import { errors } from "@strapi/utils";

export default async (policyContext, _config, { strapi }) => {
  const user = policyContext.state.user;
  const eventId = policyContext.args?.data?.event;
  const event = await strapi.entityService.findOne("api::event.event", eventId);

  if (!event) throw new errors.NotFoundError(`Event not found`);

  if (event.enabled_modules?.includes("caroster-plus") && !user)
    throw new errors.ForbiddenError();
  else if (user) policyContext.args.data.user = user.id;
};
