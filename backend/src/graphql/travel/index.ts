export default [
  ({ nexus, strapi }) => ({
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
