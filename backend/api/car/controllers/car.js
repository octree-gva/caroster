'use strict';

module.exports = {
  async create(ctx) {
    const car = await strapi.services.car.create(ctx.request.body);
    return strapi.services.car.sanitize(car);
  },

  async update(ctx) {
    const {id} = ctx.params;
    const car = await strapi.services.car.update({id}, ctx.request.body);
    return strapi.services.car.sanitize(car);
  },

  async delete(ctx) {
    const {id} = ctx.params;
    const car = await strapi.services.car.delete({id});
    return strapi.services.car.sanitize(car);
  },
};
