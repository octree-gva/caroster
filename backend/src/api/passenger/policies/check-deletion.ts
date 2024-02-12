import { errors } from "@strapi/utils";

export default async (policyContext, _config, { strapi }) => {
  const passengerId = policyContext.args?.id;
  const passenger = await strapi.entityService.findOne(
    "api::passenger.passenger",
    passengerId,
    {
      populate: ["event", "user"],
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
    if (isAdmin) {
      // TODO Create notification to passenger's linked user
      return true;
    } else if (passenger.user.id == user.id) return true;
    else return false;
  }
};
