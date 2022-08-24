export default [
  ({ nexus, strapi }) => ({
    resolvers: {
      Mutation: {
        deleteVehicle: {
          async resolve(_root, args, context) {
            const { user } = context.state;
            const vehicle = await strapi.entityService.findOne(
              "api::vehicle.vehicle",
              args.id,
              { populate: ["user"] }
            );

            if (!vehicle) throw new Error("Vehicle not found");
            else if (vehicle.user?.id !== user.id)
              throw new Error("Not Authorized");

            const deleteVehicle = await strapi.entityService.delete(
              "api::vehicle.vehicle",
              args.id
            );

            return {
              value: deleteVehicle,
              info: { args, resourceUID: "api::vehicle.vehicle" },
            };
          },
        },
      },
    },
  }),
];
