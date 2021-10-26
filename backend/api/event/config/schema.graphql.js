module.exports = {
  definition: `
    extend input EventInput {
      newsletter: Boolean
    }

    input updateEventByUUIDInput {
      where: InputUUID
      data: editEventInput
    }

    input InputUUID {
      uuid: String!
    }
  `,
  query: `
        eventByUUID(uuid: String!): Event
    `,
  mutation: `
        updateEventByUUID(input: updateEventByUUIDInput): updateEventPayload
  `,
  type: {},
  resolver: {
    Query: {
      eventByUUID: {
        description: 'Retrieve an event using its UUID',
        resolver: 'application::event.event.findOne',
      },
    },
    Mutation: {
      updateEventByUUID: {
        description: 'Update an event using its UUID',
        resolver: 'application::event.event.update',
      },
    },
  },
};
