'use strict';

module.exports = {
  getId: async templateName => {
    const template = await strapi.plugins[
      'email-designer'
    ].services.template.fetch({name: templateName});
    if (!template)
      throw new Error(`No email template with name ${templateName}`);
    return template.id;
  },
};
