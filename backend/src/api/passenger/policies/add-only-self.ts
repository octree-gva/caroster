import { errors } from "@strapi/utils";

export default async (policyContext) => {
  const user = policyContext.state.user;
  const inputUserId = policyContext.args?.data?.user;

  if (inputUserId) {
    if (user && `${user.id}` !== inputUserId) {
      const event = await strapi.entityService.findOne(
        "api::event.event",
        policyContext.args.data.event
      );
      const administrators = event.administrators?.split(/, ?/) || [];
      const isEventAdmin = [...administrators, event.email].includes(
        user.email
      );
      if (!isEventAdmin)
        throw new errors.UnauthorizedError("Can't add another linked user");
      else policyContext.args.data.isAdmin = true;
    } else if (!user)
      throw new errors.UnauthorizedError("Can't add linked user as anonymous");
  }
};
