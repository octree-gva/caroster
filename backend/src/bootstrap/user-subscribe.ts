import sendgrid from "../lib/sendgrid";

export default async ({ strapi }) => {
  strapi.db.lifecycles.subscribe({
    models: ["plugin::users-permissions.user"],

    async afterCreate({ result }) {
      if (result.email) {
        await sendgrid.subscribe(result.email);
        strapi.log.info(
          `New user with email address ${result.email} subscribed to mailing list`
        );
      }
    },
  });
};
