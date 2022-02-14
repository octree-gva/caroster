'use strict';

module.exports = {
  async create(ctx) {
    const {createVehicle = false, ...travelInput} = ctx.request.body;
    const userId = ctx.state.user?.id;

    if (userId && createVehicle) {
      try {
        const vehicleInput = {
          name: travelInput.vehicleName,
          seats: travelInput.seats || 0,
          phone_number: travelInput.phone_number,
          user: userId,
        };
        await strapi.services.vehicle.create(vehicleInput);
      } catch (error) {
        console.error(`Can't create vehicle for user ${userId}`, error);
      }
    }

    try {
      return await strapi.services.travel.create(travelInput);
    } catch (error) {
      console.error(`Can't create new travel`, error);
      throw new Error("Can't create new travel");
    }
  },
};
