const Strapi = require("@strapi/strapi");
const moment = require("moment");

const main = async () => {
  const appContext = await Strapi.compile();
  await Strapi(appContext).load();

  const travels = await strapi.entityService.findMany("api::travel.travel", {
    limit: -1,
    filters: {
      departure: { $notNull: true },
    },
  });

  for (const travel of travels) {
    const departureDate = moment(travel.departure).format("YYYY-MM-DD");
    const departureTime = moment(travel.departure).format("HH:mm");

    console.log(
      `Update travel ${travel.id}: ${travel.departure} => ${departureDate} ${departureTime}`
    );
    await strapi.entityService.update("api::travel.travel", travel.id, {
      data: {
        departureDate,
        departureTime,
      },
    });
  }

  process.exit(0);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
