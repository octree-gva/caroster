import { errors } from "@strapi/utils";

export default async (policyContext, config, { strapi }) => {
  const eventId = policyContext.args?.data?.event;
  const event = await strapi.entityService.findOne("api::event.event", eventId);

  if (!event) throw new errors.NotFoundError(`Event not found`);

  const user = policyContext.state.user;
  if (event.enabled_modules?.includes("caroster-plus") && !user)
    throw new errors.ForbiddenError();
};
