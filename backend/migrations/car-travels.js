/**
 * AVANT DE LANCER CE SCRIPT
 * DÉSACTIVER L'ENVOI DE MAIL LORS DE LA CRÉATION D'UN TRAVEL
 */

const Strapi = require('strapi');

// Commenter les lignes suivantes si les emails sur le hook sont désactivés
console.log(
  "Avez-vous bien désactivé l'envoi d'emails à la création d'un travel ?"
);
process.exit(1);

const main = async () => {
  await Strapi().load();

  const cars = await strapi.services.car.find({_limit: -1});

  for (let i = 0; i < cars.length; i++) {
    try {
      await splitCar(cars[i]);
    } catch (error) {
      console.error(error);
    }
  }

  strapi.log.debug('Done.');
  process.exit(0);
};

const splitCar = async car => {
  const vehicle = {
    name: car.name,
    seats: car.seats,
    phone_number: car.phone_number,
  };

  const newVehicle = await strapi.services.vehicle.create(vehicle);

  const travel = {
    meeting: car.meeting,
    departure: car.departure,
    details: car.details,
    passengers: car.passengers,
    event: car.event?.id,
    vehicle: newVehicle.id,
  };

  await strapi.services.travel.create(travel);
};

main();
