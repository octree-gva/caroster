export default async ({ strapi }) => {
  await strapi.service("api::email.email").loadContentFiles();
};
