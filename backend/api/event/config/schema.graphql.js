module.exports = {
  query: `
        eventByUUID(uuid: String!): Event
    `,
  type: {},
  resolver: {
    Query: {
      eventByUUID: {
        description: 'Retrieve an event using its UUID',
        resolver: 'application::event.event.getByUUID',
      },
    },
  },
};
