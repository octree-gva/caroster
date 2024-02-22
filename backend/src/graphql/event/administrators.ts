import { errors } from "@strapi/utils";

export default ({ nexus, strapi }) => ({
  types: [
    nexus.extendType({
      type: "Event",
      definition(t) {
        t.field("administrators", {
          type: nexus.list("String"),
        });
      },
    }),
    nexus.mutationField("addEventAdmin", {
      type: "EventEntityResponse",
      args: {
        eventId: nexus.nonNull("ID"),
        email: nexus.nonNull("String"),
      },
    }),
    nexus.mutationField("deleteEventAdmin", {
      type: "EventEntityResponse",
      args: {
        eventId: nexus.nonNull("ID"),
        email: nexus.nonNull("String"),
      },
    }),
  ],
  resolvers: {
    Event: {
      administrators: (event) => event.administrators?.split(/, ?/).filter(Boolean) || [],
    },
    Mutation: {
      addEventAdmin: {
        async resolve(_root, args, context) {
          // Retrieve targeted event
          const event = await strapi.entityService.findOne(
            "api::event.event",
            args.eventId
          );
          if (!event) throw new errors.NotFoundError(`Event not found`);

          const currentAdmins = event.administrators?.split(/, ?/).filter(Boolean) || [];

          // Check if user is authorized to add event admin
          const user = context.state.user;
          if (user.email !== event.email && !currentAdmins.includes(user.email))
            throw new errors.ForbiddenError();

          // Add email to event's administrators list
          const sanitizedEmail = args.email.replaceAll(",", "");
          const administrators = new Set([...currentAdmins, sanitizedEmail]);
          const updatedEvent = await strapi.entityService.update(
            "api::event.event",
            args.eventId,
            {
              data: {
                administrators: [...administrators].join(", "),
              },
            }
          );

          // Create notification for targeted user
          const targetedUser = await strapi.db
            .query("plugin::users-permissions.user")
            .findOne({
              where: { email: args.email },
            });
          if (targetedUser) {
            strapi.entityService.create("api::notification.notification", {
              data: {
                type: "AddedAsAdmin",
                event: args.eventId,
                user: targetedUser.id,
              },
            });
          } else
            strapi.log.warn(
              `No user with email '${args.email}'. Can't create notification AddedAsAdmin for event ${args.eventId}`
            );

          // Send formated response
          const { toEntityResponse } = strapi
            .plugin("graphql")
            .service("format").returnTypes;
          return toEntityResponse(updatedEvent, {
            args,
            resourceUID: "api::event.event",
          });
        },
      },
      deleteEventAdmin: {
        async resolve(_root, args, context) {
          // Retrieve targeted event
          const event = await strapi.entityService.findOne(
            "api::event.event",
            args.eventId
          );
          if (!event) throw new errors.NotFoundError(`Event not found`);

          const currentAdmins = event.administrators?.split(/, ?/) || [];

          // Check if user is authorized to remove event admin
          const user = context.state.user;
          if (user.email !== event.email && !currentAdmins.includes(user.email))
            throw new errors.ForbiddenError();

          // Remove email from event's administrators list
          const administratorsArray = currentAdmins.filter(
            (email) => email !== args.email
          );

          const administrators = administratorsArray.join(", ");

          const updatedEvent = await strapi.entityService.update(
            "api::event.event",
            args.eventId,
            { data: { administrators } }
          );

          // Send formated response
          const { toEntityResponse } = strapi
            .plugin("graphql")
            .service("format").returnTypes;
          return toEntityResponse(updatedEvent, {
            args,
            resourceUID: "api::event.event",
          });
        },
      },
    },
  },
  resolversConfig: {
    "Mutation.addEventAdmin": {
      auth: true,
    },
    "Mutation.deleteEventAdmin": {
      auth: true,
    },
  },
});
