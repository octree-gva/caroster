'use strict';

module.exports = {
  async create(ctx) {
    const car = await strapi.services.car.create(ctx.request.body);
    if (car) return strapi.services.car.sanitize(car);
    else return ctx.badRequest('No car found');
  },

  async update(ctx) {
    const {id} = ctx.params;

    try {
      const car = await strapi.services.car.update({id}, ctx.request.body);
      return strapi.services.car.sanitize(car);
    } catch (error) {
      return ctx.badRequest('No car found');
    }
  },

  async delete(ctx) {
    const {id} = ctx.params;

    try {
      const car = await strapi.services.car.delete({id});
      return strapi.services.car.sanitize(car);
    } catch (error) {
      return ctx.badRequest('No car found');
    }
  },
};
