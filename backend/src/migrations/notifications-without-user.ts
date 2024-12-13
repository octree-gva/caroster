const Strapi = require("@strapi/strapi");

const main = async () => {
  const appContext = await Strapi.compile();
  await Strapi(appContext).load();

  const notifications = await strapi.entityService.findMany(
    "api::notification.notification",
    {
      filters: {
        user: { id: { $null: true } },
      },
      limit: -1,
    }
  );
  console.log(`NOTIFICATIONS COUNT: ${notifications.length}`);
  for (const notification of notifications) {
    console.log(`Remove ${notification.id}`);
    await strapi.entityService.delete(
      "api::notification.notification",
      notification.id
    );
  }
  process.exit(0);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
