/* eslint-disable class-methods-use-this */
const faker = require('faker');
const axios = require('axios');
class _Scene {
  constructor() {
    this.scene = undefined;
    this.actor = this.randomActor();
    this.event = this.randomEvent();
  }

  /**
   * @returns {Object}
   */
  randomActor() {
    return {
      email: faker.internet.email(),
    };
  }

  randomEvent() {
    return {
      address: `${faker.address.streetAddress()}, ${faker.address.zipCode()} ${faker.address.city()}`,
      date: faker.date.future(),
      name: `${faker.hacker.noun()} ${faker.hacker.verb()} ${faker.hacker.adjective()}`,
    };
  }
  /**
   * Create an event and set an event id.
   * @return {string} the new event id
   */
  async createEvent() {
    const {
      data: {id},
    } = await axios.post(`${process.env.BASE_URL}/events`, {
      address: this.event.address,
      date: this.event.date.toISOString(),
      email: this.actor.email,
      name: this.event.name,
    });
    this.event.id = id;
    return id;
  }
}
exports.Scene = new _Scene();
