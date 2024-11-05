import pMap from "p-map";

export default [
  ({ nexus, strapi }) => ({
    types: [
      nexus.mutationField("readNotifications", {
        type: "NotificationEntityResponseCollection",
        args: {
          id: "ID",
        },
      }),
    ],
    resolvers: {
      Query: {
        notifications: {
          async resolve(_root, args, context) {
            const user = context.state.user;
            const userNotifications = await strapi.entityService.findMany(
              "api::notification.notification",
              {
                filters: {
                  user: { id: { $eq: user.id } },
                  event: { id: { $notNull: true } },
                },
                sort: { createdAt: "DESC" },
                limit: args?.pagination?.limit || 20,
              }
            );
            return {
              nodes: userNotifications,
              info: { args, resourceUID: "api::notification.notification" },
            };
          },
        },
      },
      Mutation: {
        readNotifications: {
          async resolve(_root, args, context) {
            const user = context.state.user;
            const { id } = args;

            const { toEntityResponseCollection } = strapi
              .plugin("graphql")
              .service("format").returnTypes;

            let idFilter = {};
            if (id) idFilter = { id };

            const userNotifications = await strapi.entityService.findMany(
              "api::notification.notification",
              {
                filters: {
                  user: { id: user.id },
                  read: false,
                  ...idFilter,
                },
              }
            );
            const updatedNotifications = await pMap(
              userNotifications,
              (notification: { id: "string" }) =>
                strapi.entityService.update(
                  "api::notification.notification",
                  notification.id,
                  { data: { read: true } }
                )
            );
            return toEntityResponseCollection(updatedNotifications, {
              resourceUID: "api::notification.notification",
            });
          },
          id: {
            description:
              "Notification ID to read. If no ID is provided, all user's notifications are set as read.",
          },
        },
      },
    },
    resolversConfig: {
      "Query.notifications": {
        auth: true,
      },
      "Mutation.readNotifications": {
        auth: true,
      },
      "Notification.event": {
        auth: true,
      },
    },
  }),
];
