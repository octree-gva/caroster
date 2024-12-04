import { errors } from "@strapi/utils";

export default [
  ({ nexus, strapi }) => ({
    types: [
      nexus.queryField("eventTripAlert", {
        type: "TripAlertEntityResponse",
        args: {
          event: nexus.nonNull("ID"),
        },
      }),
      nexus.mutationField("setTripAlert", {
        type: "TripAlertEntityResponse",
        args: {
          event: nexus.nonNull("ID"),
          enabled: "Boolean",
          latitude: "Float",
          longitude: "Float",
          radius: "Float",
          address: "String",
        },
      }),
    ],
    resolvers: {
      Query: {
        eventTripAlert: {
          async resolve(_root, args, context) {
            const user = context.state.user;
            if (!user) throw new errors.ForbiddenError("No user found");

            const [existingAlert] = await strapi.entityService.findMany(
              "api::trip-alert.trip-alert",
              {
                filters: {
                  user: user.id,
                  event: args.event,
                },
              }
            );

            const { toEntityResponse } = strapi
              .plugin("graphql")
              .service("format").returnTypes;
            return toEntityResponse(existingAlert, {
              args,
              resourceUID: "api::trip-alert.trip-alert",
            });
          },
        },
      },
      Mutation: {
        setTripAlert: {
          async resolve(_root, args, context) {
            const user = context.state.user;
            if (!user) throw new errors.ForbiddenError("No user found");

            const [existingAlert] = await strapi.entityService.findMany(
              "api::trip-alert.trip-alert",
              {
                filters: {
                  user: user.id,
                  event: args.event,
                },
                populate: ["event"],
              }
            );

            let tripAlert;
            if (existingAlert)
              tripAlert = await strapi.entityService.update(
                "api::trip-alert.trip-alert",
                existingAlert.id,
                {
                  data: {
                    ...args,
                    event: existingAlert.event?.id,
                    user: user.id,
                  },
                }
              );
            else
              tripAlert = await strapi.entityService.create(
                "api::trip-alert.trip-alert",
                {
                  data: {
                    ...args,
                    user: user.id,
                  },
                }
              );

            const { toEntityResponse } = strapi
              .plugin("graphql")
              .service("format").returnTypes;
            return toEntityResponse(tripAlert, {
              args,
              resourceUID: "api::trip-alert.trip-alert",
            });
          },
        },
      },
    },
    resolversConfig: {
      "Query.eventTripAlert": {
        auth: true,
      },
      "Mutation.setTripAlert": {
        auth: true,
      },
      "TripAlert.user": {
        auth: true,
      },
    },
  }),
];
