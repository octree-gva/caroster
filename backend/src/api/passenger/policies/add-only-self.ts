import { errors } from "@strapi/utils";

export default async (policyContext) => {
  const user = policyContext.state.user;
  const inputUserId = policyContext.args?.data?.user;

  if (inputUserId) {
    if (user && `${user.id}` !== inputUserId)
      throw new errors.UnauthorizedError("Can't add another linked user");
    else if (!user)
      throw new errors.UnauthorizedError("Can't add linked user as anonymous");
  }
};
