import { DateTime } from "luxon";
import pMap from "p-map";

export default {
  /**
   * Send event recap to creators
   * Everyday at 08:00
   */
  "*/1 * * * *": async ({ strapi }) => {
    const events = await strapi.entityService.findMany("api::event.event", {
      filters: {
        date: {
          $gte: DateTime.now().toISODate(),
        },
      },
      limit: -1,
    });

    await pMap(events, strapi.service("api::event.event").sendDailyRecap, {
      concurrency: 5,
    });
  },
};
