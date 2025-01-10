export default [
  {
    method: "POST",
    path: "/auth/magic-link",
    handler: async (ctx) => {
      const { token } = ctx.request.body;

      try {
        const payload = await strapi.services[
          "plugin::users-permissions.user"
        ].magicLink.verifyMagicToken(token);
        const email = payload.email;
        if (!email) throw new Error("No email in token");
        const existingUser = await strapi.db
          .query("plugin::users-permissions.user")
          .findOne({
            where: { email },
          });
        if (existingUser) {
          const jwt = strapi
            .plugin("users-permissions")
            .service("jwt")
            .issue({ id: existingUser.id });
          return {
            jwt,
            user: {
              id: existingUser.id,
              email: existingUser.email,
              firstname: existingUser.firstname,
              lang: existingUser.lang,
            },
          };
        }
        const user = await strapi
          .plugin("users-permissions")
          .service("user")
          .add({
            email,
            username: email,
            provider: "local",
            confirmed: true,
            lang: payload.lang,
            role: 1, // authenticated
          });
        const jwt = strapi
          .plugin("users-permissions")
          .service("jwt")
          .issue({ id: user.id });

        return {
          jwt,
          user: {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lang: user.lang,
          },
        };
      } catch (error) {
        strapi.log.warn(error);
        return ctx.unauthorized("Invalid magic link token");
      }
    },
    config: {
      prefix: "",
      auth: false,
    },
  },
];
