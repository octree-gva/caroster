export default [
  ({ nexus, strapi }) => ({
    resolvers: {
      Passenger: {
        // Filter user private fields in passenger lists
        user: {
          async resolve(parent) {
            const passenger = await strapi.entityService.findOne(
              "api::passenger.passenger",
              parent.id,
              { populate: ["user"] }
            );
            const user = passenger?.user;
            if (!user) return null;

            return {
              value: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                lang: user.lang,
              },
            };
          },
        },
      },
      UsersPermissionsUser: {
        // Filter user vehicles if not for profile fetching
        vehicles: {
          async resolve(queriedUser, args, _context, query) {
            if (query.path.prev.key !== "profile") return null;

            const user = await strapi.entityService.findOne(
              "plugin::users-permissions.user",
              queriedUser.id,
              { populate: ["vehicles"] }
            );
            if (!user?.vehicles) return null;

            const { toEntityResponseCollection } = strapi
              .plugin("graphql")
              .service("format").returnTypes;

            return toEntityResponseCollection(user.vehicles, {
              args,
              resourceUID: "api::vehicle.vehicle",
            });
          },
        },
      },
    },
  }),
];
