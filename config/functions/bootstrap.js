'use strict';

const permissions = require('../permissions.json');

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = async () => {
  /**
   * Set permissions
   */

  // For each role, set permissions
  const roles = Object.keys(permissions.roles);
  await Promise.all(
    roles.map(async roleType => {
      // Get role entity in Strapi db
      const role = await strapi.query('role', 'users-permissions').findOne({
        type: roleType,
      });
      // If role doesn't exist, skip
      if (!role) return [];

      // Enable or create permissions for each roles, controllers and actions
      const perms = permissions.roles[roleType];
      return perms.map(({type, controllers}) =>
        controllers.map(({name: controller, actions}) =>
          actions.map(async action => {
            const existingPerm = await strapi
              .query('permission', 'users-permissions')
              .findOne({
                role: role.id,
                type,
                controller,
                action,
              });
            if (existingPerm) {
              if (existingPerm.enabled) return false; // If permission already enabled, skip
              strapi.log.info(
                `Enable permission ${type}.${controller}.${action} for role ${roleType}.`
              );
              return strapi
                .query('permission', 'users-permissions')
                .update(
                  {role: role.id, type, controller, action},
                  {enabled: true}
                );
            } else {
              strapi.log.info(
                `Create permission ${type}.${controller}.${action} for role ${roleType}.`
              );
              return strapi.query('permission', 'users-permissions').create({
                role: role.id,
                type,
                controller,
                action,
                enabled: true,
              });
            }
          })
        )
      );
    })
  );
};
