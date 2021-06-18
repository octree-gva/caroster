module.exports = ({env}) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('STRAPI_URL', ''),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f7c00070368be0aec6e1c0335ffd49de'),
    },
  },
});
