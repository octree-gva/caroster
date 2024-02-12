import { errors } from "@strapi/utils";

export default async (policyContext, _config, { strapi }) => {
  const { uuid } = policyContext.args;

  const event = await strapi.db
    .query("api::event.event")
    .findOne({ where: { uuid } });

  if (!event) throw new errors.NotFoundError(`Event not found`);

  if (event.enabled_modules?.includes("caroster-plus")) {
    const user = policyContext.state.user;
    if (!user) throw new errors.ForbiddenError();

    const admins = event.administrators?.split(/, ?/) || [];
    return [...admins, event.email].includes(user.email);
  }
};
