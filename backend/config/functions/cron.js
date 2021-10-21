'use strict';

const pMap = require('p-map');
const moment = require('moment');

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Send event recap to creators
   * Everyday at 08:00
   */
  '0 8 * * *': async () => {
    const events = await strapi.services.event.find({
      _limit: -1,
      date_gte: moment().toISOString(),
    });
    await pMap(events, strapi.services.event.sendDailyRecap, {concurrency: 5});
  },
};
