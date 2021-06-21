const proxy = require('koa-proxy');

module.exports = strapi => ({
  async initialize() {
    const {host = '', conf = {}} = strapi.config.middleware.settings[
      'next-proxy'
    ];

    strapi.router.get('/', proxy({host, ...conf}));

    strapi.app.use(async (ctx, next) => {
      await next();

      if (ctx.response.status === 404) {
        await proxy({host, ...conf})(ctx);
      }
    });
  },
});
