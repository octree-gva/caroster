export default [
  ({ nexus, strapi }) => ({
    types: [
      nexus.extendType({
        type: "Mutation",
        definition(t) {
          t.field("createTravel", {
            type: "TravelEntityResponse",
            args: {
              data: nexus.nonNull("TravelInput"),
              createVehicle: "Boolean",
            },
          });
        },
      }),
    ],
    resolvers: {
      Mutation: {
        createTravel: {
          async resolve(_root, args, context) {
            const {
              state: { user },
            } = context;

            const createdTravel = await strapi.entityService.create(
              "api::travel.travel",
              {
                data: {
                  ...args.data,
                  user: user?.id,
                },
              }
            );

            if (user && args.createVehicle) {
              const vehicleData = {
                name: args.data.vehicleName,
                seats: args.data.seats || 0,
                phone_number: args.data.phone_number,
                user: user.id,
              };
              await strapi.entityService.create("api::vehicle.vehicle", {
                data: vehicleData,
              });
              strapi.log.info(`New vehicle created for user ${user.id}`);
            }

            return {
              value: createdTravel,
              info: { args, resourceUID: "api::travel.travel" },
            };
          },
        },
      },
    },
    resolversConfig: {
      "Mutation.createTravel": {
        auth: false,
        policies: ["api::travel.check-creation"],
      },
      "Mutation.updateTravel": {
        auth: false,
        policies: ["api::travel.check-update"],
      },
      "Mutation.deleteTravel": {
        auth: false,
        policies: ["api::travel.check-deletion"],
      },
      "Travel.passengers": {
        auth: false,
      },
      "Travel.user": {
        auth: false,
      },
    },
  }),
];
