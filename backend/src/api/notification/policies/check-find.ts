import { errors } from "@strapi/utils";

export default async (policyContext) => {
  const user = policyContext.state.user;
  if (!user) throw new errors.ForbiddenError();

  policyContext.args.filters = {
    ...(policyContext.args || {}),
    user: { id: { eq: user.id } },
  };
};
