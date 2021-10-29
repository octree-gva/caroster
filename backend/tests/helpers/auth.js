let adminJwt = null;

const getAdminJwt = async () => {
  if (adminJwt) return adminJwt;

  const adminUser = await getAdminUser();
  return strapi.admin.services.token.createJwtToken(adminUser);
};

const getAdminUser = async () => {
  const existingAdminUser = await strapi.admin.services.user.findOne({
    username: 'test',
  });

  if (existingAdminUser) return existingAdminUser;

  try {
    const user = await strapi.admin.services.user.create({
      registrationToken: null,
      isActive: true,
      username: 'test',
      password: 'test',
      email: 'test@test.com',
      roles: [1],
    });
    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {getAdminJwt, getAdminUser};
