import { errors } from "@strapi/utils";

export default async (policyContext, config, { strapi }) => {
  const user = policyContext.state.user;
  if (!user)
    throw new errors.ForbiddenError(
      "Only authenticated user can create vehicle."
    );

  if (policyContext.args?.data?.user !== user.id)
    throw new errors.UnauthorizedError(
      "Can only create vehicle for authenticated user."
    );
};
