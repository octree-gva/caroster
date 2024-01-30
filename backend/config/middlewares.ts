export default [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "editor.unlayer.com"],
          "frame-src": ["'self'", "editor.unlayer.com"],
          "img-src": [
            "'self'",
            "data:",
            "cdn.jsdelivr.net",
            "strapi.io",
            "s3.amazonaws.com",
          ],
        },
      },
    },
  },
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
