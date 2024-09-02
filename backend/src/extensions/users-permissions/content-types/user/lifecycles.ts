export default {
  async afterCreate(event) {
    const { result } = event;
    if (result.email) {
      const linkedEvents = await strapi.entityService.findMany(
        "api::event.event",
        {
          filters: { email: result.email },
          populate: ["users"],
        }
      );
      for (const event of linkedEvents) {
        strapi.log.info(
          `Set user ${result.id} (${result.email}) as creator of event ${event.id} (${event.uuid})`
        );
        await strapi.entityService.update("api::event.event", event.id, {
          data: {
            creator: result.id,
            users: [...(event.users || []), result.id],
          },
        });
      }
    }
  },
};
