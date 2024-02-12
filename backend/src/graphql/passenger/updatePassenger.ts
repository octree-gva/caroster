const updatePassenger = {
  description: "Update a passenger",
  async resolve(_root, args) {
    const { id, data } = args;
    try {
      const passenger = await strapi.entityService.update(
        "api::passenger.passenger",
        id,
        { data }
      );
      const { toEntityResponse } = strapi
        .plugin("graphql")
        .service("format").returnTypes;
      return toEntityResponse(passenger, {
        args,
        resourceUID: "api::passenger.passenger",
      });
    } catch (error) {
      strapi.log.error(error);
    }
  },
};

export default updatePassenger;
