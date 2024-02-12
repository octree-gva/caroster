import createPassenger from "./createPassenger";
import updatePassenger from "./updatePassenger";

export default [
  ({ strapi }) => ({
    resolvers: {
      Mutation: {
        createPassenger,
        updatePassenger,
      },
    },
    resolversConfig: {
      "Passenger.user": {
        auth: false,
      },
      "Passenger.travel": {
        auth: false,
      },
      "Mutation.createPassenger": {
        auth: false,
        policies: [
          "api::passenger.add-only-self",
          "api::passenger.check-creation",
        ],
      },
      "Mutation.updatePassenger": {
        auth: false,
        policies: ["api::passenger.check-update"],
      },
      "Mutation.deletePassenger": {
        auth: false,
        policies: ["api::passenger.check-deletion"],
      },
    },
  }),
];
