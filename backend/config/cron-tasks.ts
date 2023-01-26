import { DateTime } from "luxon";
import pMap from "p-map";

export default {
  /**
   * Send event recap to creators
   * Everyday at 08:00
   */
  "0 8 * * *": async ({ strapi }) => {
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
  /**
   * Send event recap when it has ended
   * Only to events with a provided 'date' field
   * Everyday at 08:30
   */
  "30 8 * * *": async ({ strapi }) => {
    const events = await strapi.entityService.findMany("api::event.event", {
      filters: {
        date: {
          $eq: DateTime.now().toISODate(),
        },
      },
      populate: ["travels", "passengers", "passengers.travel"],
      limit: -1,
    });
    await pMap(events, strapi.service("api::event.event").sendEndRecap, {
      concurrency: 5,
    });
  },
};
