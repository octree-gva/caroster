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
            const userUpdateEvents = userUpdate.events?.filter(
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
      // Filter user fields if not for profile fetching
      UsersPermissionsUser: {
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
    resolversConfig: {
      "Query.me": {
        auth: {
          scope: ["plugin::users-permissions.user.me"],
        },
      },
      "UsersPermissionsUser.vehicles": {
        auth: true,
      },
      "UsersPermissionsUser.events": {
        policies: [checkAuthUser],
      },
      "UsersPermissionsUser.notifications": {
        policies: [checkAuthUser],
      },
      "UsersPermissionsUser.confirmed": {
        policies: [checkAuthUser],
      },
      "UsersPermissionsUser.provider": {
        policies: [checkAuthUser],
      },
      "UsersPermissionsUser.newsletterConsent": {
        policies: [checkAuthUser],
      },
      "UsersPermissionsUser.createdAt": {
        policies: [checkAuthUser],
      },
      "UsersPermissionsUser.onboardingCreator": {
        policies: [checkAuthUser],
      },
      "UsersPermissionsUser.onboardingUser": {
        policies: [checkAuthUser],
      },
    },
  }),
];

const checkAuthUser = (context) => {
  const authUser = context.state.user;
  return context.parent.id === authUser.id;
};
