const publicPerms = [
  "api::event.event.create",
  "api::event.event.findOne",
  "api::page.page.find",
  "api::page.page.findOne",
  "api::module.module.find",
  "api::setting.setting.find",
  "api::stripe.stripe.handleWebhook",
];

const authenticated = [...publicPerms, "plugin::users-permissions.user.me"];

export default {
  roles: {
    public: publicPerms,
    authenticated,
  },
};
