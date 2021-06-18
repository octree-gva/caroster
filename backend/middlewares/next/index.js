const next = require('next');

module.exports = strapi => ({
  async initialize() {
    if (process.env.NODE_ENV !== 'production') return;

    const app = next({
      dev: process.env.NODE_ENV !== 'production',
      ...strapi.config.middleware.settings.next,
    });
    const handle = app.getRequestHandler();

    // Prepare NextJS server
    await app.prepare();

    // Serve NextJS on index
    strapi.router.get('/', ctx => handle(ctx.req, ctx.res));

    // Serve NextJS app on non-handled endpoints
    strapi.app.use(async (ctx, nxt) => {
      await nxt();

      if (ctx.response.status === 404) {
        await handle(ctx.req, ctx.res);
      }
    });
  },
});
