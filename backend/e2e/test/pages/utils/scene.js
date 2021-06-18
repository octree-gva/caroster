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
function randomFutureDate() {
  const num = x => (x < 10 ? `0${x}` : `${x}`);
  const date = faker.date.future();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}-${num(month)}-${num(day)}`;
}

class _Scene {
  constructor() {
    this.feature = undefined;
    this.screenShotCount = 0;
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
      date: randomFutureDate(),
      name: `${faker.hacker.noun()} ${faker.hacker.verb()} ${faker.hacker.adjective()}`,
    };
  }

  /**
   * @return {Object}
   */
  randomCar() {
    return {
      name: `${faker.hacker.verb()} ${faker.commerce.productName()}`,
      seats: faker.random.number({min: 0, max: 7}),
      meeting: `${faker.address.streetAddress()}, ${faker.address.zipCode()} ${faker.address.city()}`,
      meeting_date: randomFutureDate(),
      details: faker.lorem.paragraph(),
    };
  }

  /**
   * Create an event and set an event id.
   * @return {string} the new event id
   */
  async createEvent() {
    try {
      const {
        data: {id},
      } = await axios.post(`${process.env.BASE_URL}/events`, {
        address: this.event.address,
        date: faker.date.future().toISOString(),
        email: this.actor.email,
        name: this.event.name,
      });
      this.event.id = id;
      return id;
    } catch (err) {
      console.error('can not create event', {err});
      throw err;
    }
  }
}
exports.Scene = new _Scene();
