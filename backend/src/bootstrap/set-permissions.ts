export default async ({ strapi }) => {
  const { permissions = [] } = strapi.config;
  const roles = await strapi.query("plugin::users-permissions.role").findMany();

  for (const role of roles) {
    const rolePermissions = permissions.roles[role.type];

    if (!rolePermissions) continue;

    await Promise.all(
      rolePermissions.map(async (action) => {
        const existingPerm = await strapi
          .query("plugin::users-permissions.permission")
          .findOne({ where: { action, role: role.id } });

        if (!existingPerm) {
          strapi.log.debug(`Create permission ${action} for role ${role.type}`);
          strapi.query("plugin::users-permissions.permission").create({
            data: {
              action,
              role: role.id,
            },
          });
        }
      })
    );
  }
};
