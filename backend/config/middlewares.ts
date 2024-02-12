export default [
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  { name: "strapi::body", config: { includeUnparsed: true } },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",

  {
    resolve: "./src/middlewares/graphql-logger",
    config: {
      enabled: true,
      conf: {},
    },
  },
];
