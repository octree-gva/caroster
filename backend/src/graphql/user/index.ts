export default [
  ({ nexus, strapi }) => ({
    types: [
      nexus.extendType({
        type: "UsersPermissionsMe",
        definition(t) {
          t.field("profile", {
            type: "UsersPermissionsUser",
          });
        },
      }),
      nexus.extendInputType({
        type: "UsersPermissionsUserInput",
        definition(t) {
          t.string("oldPassword");
        },
      }),
      nexus.extendType({
        type: "Mutation",
        definition(t) {
          t.field("updateMe", {
            type: nexus.nonNull("UsersPermissionsUserEntityResponse"),
            args: {
              data: nexus.nonNull("UsersPermissionsUserInput"),
            },
          });
        },
      }),
    ],
    resolvers: {
      Query: {
        me: {
          async resolve(_root, _args, context) {
            const user = context.state?.user;
            if (!user) throw new Error("Authentication requested");
            return { id: user.id, username: user.username, profile: user };
          },
        },
      },
      Mutation: {
        updateMe: {
          async resolve(_root, args, context) {
            const { data: userUpdate } = args;
            const userId = context.state?.user?.id;

            if (!userId) throw new Error("Authentication requested");

            const user = await strapi
              .plugin("users-permissions")
              .services.user.fetch(userId, { populate: { events: true } });

            if (userUpdate.password) {
              const validPassword = await strapi
                .plugin("users-permissions")
                .services.user.validatePassword(
                  userUpdate.oldPassword || "",
                  user.password
                );
              if (!validPassword) throw new Error("Wrong password");
              delete userUpdate.oldPassword;
            }

            const currentEvents = user.events || [];
            const currentEventIds = currentEvents.map((event) => `${event.id}`);
            const userUpdateEvents = userUpdate.events.filter(
              (eventId) => !currentEventIds.includes(eventId)
            );
            const updatedEvents = userUpdate.events
              ? [...currentEvents, ...userUpdateEvents]
              : user.events;

            const updatedUser = await strapi.entityService.update(
              "plugin::users-permissions.user",
              user.id,
              {
                data: {
                  ...userUpdate,
                  events: updatedEvents,
                },
              }
            );
            const { toEntityResponse } = strapi
              .plugin("graphql")
              .service("format").returnTypes;

            return toEntityResponse(updatedUser, {
              args,
              resourceUID: "plugin::users-permissions.user",
            });
          },
        },
      },
    },
    resolversConfig: {
      "Query.me": {
        auth: {
          scope: ["plugin::users-permissions.user.me"],
        },
      },
      "UsersPermissionsUser.notifications": {
        auth: {
          scope: ["plugin::users-permissions.user.me"],
        },
      },
    },
  }),
];
