'use strict';
const _pick = require('lodash/pick');

const PUBLIC_FIELDS = [
  'id',
  'name',
  'seats',
  'meeting',
  'departure',
  'phone_number',
  'details',
  'passengers',
  'created_at',
  'updated_at',
];

module.exports = {
  sanitize: car => {
    const passengers = car?.passengers?.map(passenger =>
      _pick(passenger, ['id', 'name'])
    );
    const sanitizedCar = _pick(car, PUBLIC_FIELDS);
    return {...sanitizedCar, passengers};
  },
};
