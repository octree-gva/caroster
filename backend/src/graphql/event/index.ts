const updateEventExtension = ({ nexus, strapi }) => ({
  types: [
    nexus.extendType({
      type: "Event",
      definition(t) {
        t.field("waitingPassengers", {
          type: "PassengerRelationResponseCollection",
        });
      },
    }),
    nexus.extendType({
      type: "Query",
      definition(t) {
        t.field("eventByUUID", {
          type: "EventEntityResponse",
          args: {
            uuid: nexus.nonNull("String"),
          },
        });
      },
    }),
    nexus.extendType({
      type: "Mutation",
      definition(t) {
        t.field("updateEventByUUID", {
          type: "EventEntityResponse",
          args: {
            uuid: nexus.nonNull("String"),
            data: nexus.nonNull("EventInput"),
          },
        });
      },
    }),
  ],
  resolvers: {
    Event: {
      waitingPassengers: async (root, args) => {
        const waitingPassengers = await strapi
          .service("api::event.event")
          .getWaitingPassengers(root);
        const { toEntityResponseCollection } = strapi
          .plugin("graphql")
          .service("format").returnTypes;
        return toEntityResponseCollection(waitingPassengers, {
          args,
          resourceUID: "api::passenger.passenger",
        });
      },
    },
    Query: {
      eventByUUID: {
        description: "Retrieve an event using its UUID",
        async resolve(_root, args) {
          const { uuid } = args;
          const event = await strapi.db
            .query("api::event.event")
            .findOne({ where: { uuid } });
          if (!event) throw new Error("No matching event");
          const { toEntityResponse } = strapi
            .plugin("graphql")
            .service("format").returnTypes;
          return toEntityResponse(event, {
            args,
            resourceUID: "api::event.event",
          });
        },
      },
    },
    Mutation: {
      updateEventByUUID: {
        description: "Update an event using its UUID",
        async resolve(_root, args) {
          const { uuid, data: eventUpdate } = args;

          const updatedEvent = await strapi.db
            .query("api::event.event")
            .update({ where: { uuid }, data: eventUpdate });
          if (!updatedEvent) throw new Error("No matching event");

          const { toEntityResponse } = strapi
            .plugin("graphql")
            .service("format").returnTypes;
          return toEntityResponse(updatedEvent, {
            args,
            resourceUID: "api::event.event",
          });
        },
      },
      createEvent: {
        async resolve(_root, args, context) {
          const {
            koaContext,
            state: { user },
          } = context;

          let eventData = args.data;
          if (user) eventData = { ...eventData, users: [user.id] };

          koaContext.request.body = eventData;

          const createdEvent = await strapi
            .controller("api::event.event")
            .create(koaContext);

          return {
            value: createdEvent,
            info: { args, resourceUID: "api::event.event" },
          };
        },
      },
    },
  },
  resolversConfig: {
    "Query.eventByUUID": {
      auth: {
        scope: ["api::event.event.findOne"],
      },
    },
    "Mutation.updateEventByUUID": {
      auth: {
        scope: ["api::event.event.update"],
      },
    },
    "Event.passengers": {
      auth: false,
    },
    "Event.waitingPassengers": {
      auth: false,
    },
    "Event.travels": {
      auth: false,
    },
  },
});

export default [updateEventExtension];
