export default {
  async afterCreate(event) {
    const { result } = event;
    if (result.email) {
      // Link events where new user is creator
      const eventsWithCreatorEmail = await strapi.entityService.findMany(
        "api::event.event",
        { filters: { email: result.email } }
      );
      for (const linkedEvent of eventsWithCreatorEmail) {
        strapi.log.info(
          `Set user ${result.id} (${result.email}) as creator of event ${linkedEvent.id} (${linkedEvent.uuid})`
        );
        await strapi.entityService.update("api::event.event", linkedEvent.id, {
          data: {
            creator: result.id,
            users: { connect: [result.id] },
          },
        });
      }

      // Link events where new user is administrator
      const knex = strapi.db.connection;
      const eventsWithAdminEmail = await knex("events")
        .select("*")
        .whereRaw(
          `'${result.email}' = ANY(string_to_array(replace(administrators, ' ', ''), ','))`
        );
      for (const linkedEvent of eventsWithAdminEmail) {
        strapi.log.info(
          `Link user ${result.id} (${result.email}) to event ${linkedEvent.id} (${linkedEvent.uuid})`
        );
        await strapi.entityService.update("api::event.event", linkedEvent.id, {
          data: {
            users: { connect: [result.id] },
          },
        });
      }
    }
  },
};
