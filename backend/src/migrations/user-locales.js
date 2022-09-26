const Strapi = require("@strapi/strapi");

const main = async () => {
  const appContext = await Strapi.compile();
  await Strapi(appContext).load();

  const users = await strapi.entityService.findMany(
    "plugin::users-permissions.user",
    {}
  );

  for (let i = 0; i < users.length; i++) {
    try {
      await updateLanguage(users[i]);
    } catch (error) {
      console.error(error);
    }
  }

  strapi.log.debug("Done.");
  process.exit(0);
};

const updateLanguage = async (user) => {
  const lang = { EN: "en", FR: "fr" }[user.lang] || user.lang;

  return strapi.entityService.update(
    "plugin::users-permissions.user",
    user.id,
    {
      data: { ...user, lang },
    }
  );
};

main();
