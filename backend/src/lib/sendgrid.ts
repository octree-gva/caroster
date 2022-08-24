import sendgrid from "@sendgrid/client";

const { SENDGRID_API_KEY, SENDGRID_CONTACTLISTID } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

export default {
  // https://sendgrid.api-docs.io/v3.0/contacts/add-or-update-a-contact
  subscribe: async (email) => {
    if (!SENDGRID_CONTACTLISTID) {
      strapi.log.error(
        "No Sendgrid contact list ID provided (SENDGRID_DEFAULT_CONTACTLISTID)"
      );
      return null;
    }

    try {
      strapi.log.info(`Save ${email} to Sendgrid contact list.`);

      await sendgrid.request({
        method: "PUT",
        url: "/v3/marketing/contacts",
        body: { list_ids: [SENDGRID_CONTACTLISTID], contacts: [{ email }] },
      });
    } catch (error) {
      console.error(error.response.body.errors);
      strapi.log.error(
        `Impossible to save email ${email} tp Sengrid contact list. Error: ${JSON.stringify(
          error
        )}`
      );
    }
  },
};
