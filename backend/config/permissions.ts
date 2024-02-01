const publicPerms = [
  "api::travel.travel.create",
  "api::travel.travel.delete",
  "api::travel.travel.update",
  "api::vehicle.vehicle.create",
  "api::vehicle.vehicle.delete",
  "api::vehicle.vehicle.update",
  "api::event.event.create",
  "api::event.event.findOne",
  "api::event.event.update",
  "api::passenger.passenger.create",
  "api::passenger.passenger.delete",
  "api::passenger.passenger.update",
  "api::page.page.find",
  "api::page.page.findOne",
  "api::module.module.find",
  "api::setting.setting.find",
  "api::stripe.stripe.handleWebhook",
];

const authenticated = [
  ...publicPerms,
  "plugin::users-permissions.user.me",
];

export default {
  roles: {
    public: publicPerms,
    authenticated,
  },
};
