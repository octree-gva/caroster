/* eslint-disable class-methods-use-this */
const faker = require('faker');
const axios = require('axios');

function randomPhone() {
  return `${faker.random.arrayElement([
    '76',
    '78',
    '79',
    '77',
  ])}${faker.random.number({
    min: 100,
    max: 999,
  })}${faker.random.number({
    min: 10,
    max: 99,
  })}${faker.random.number({min: 10, max: 99})}`;
}

class _Scene {
  constructor() {
    this.scene = undefined;
    this.actor = this.randomActor();
    this.event = this.randomEvent();
    this.car = this.randomCar();
  }

  /**
   * @returns {Object}
   */
  randomActor() {
    return {
      email: faker.internet.email(),
      phone: faker.random.arrayElement(['+41', '0']) + randomPhone(),
    };
  }
  /**
   * @return {Object}
   */
  randomEvent() {
    return {
      address: `${faker.address.streetAddress()}, ${faker.address.zipCode()} ${faker.address.city()}`,
      date: faker.date.future(),
      name: `${faker.hacker.noun()} ${faker.hacker.verb()} ${faker.hacker.adjective()}`,
    };
  }

  /**
   * @return {Object}
   */
  randomCar() {
    return {
      name: `${faker.hacker.verb()} ${faker.commerce.productName()}`,
      seats: faker.random.number({min: 1, max: 8}),
      meeting: `${faker.address.streetAddress()}, ${faker.address.zipCode()} ${faker.address.city()}`,
      meeting_date: faker.date.future(),
      details: faker.lorem.paragraph(),
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
