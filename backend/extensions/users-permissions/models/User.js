module.exports = {
  lifecycles: {
    async afterCreate(user) {
      if (user.email) {
        try {
          await strapi.plugins['email'].services.contact.subscribe({
            email: user.email,
          });
          strapi.log.info(
            `Email ${user.email} saved to Sendgrid contact list.`
          );
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
