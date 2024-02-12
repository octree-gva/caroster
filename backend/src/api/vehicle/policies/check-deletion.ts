import { errors } from "@strapi/utils";

export default async (policyContext, config, { strapi }) => {
  const vehicleId = policyContext.args?.id;
  const vehicle = await strapi.entityService.findOne(
    "api::vehicle.vehicle",
    vehicleId,
    {
      populate: ["user"],
    }
  );

  if (!vehicle) throw new errors.NotFoundError(`Vehicle not found`);

  const user = policyContext.state.user;

  if (vehicle.user?.id !== user.id)
    throw new errors.UnauthorizedError(
      "Can only delete vehicle linked to authenticated user."
    );
};
