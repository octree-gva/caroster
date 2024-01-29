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
  "api::setting.setting.find",

  // // GraphQL disabled at load
  "api::travel.travel.find",
  "api::passenger.passenger.find",
  "api::event.event.find",
  "plugin::users-permissions.user.find",
  "api::vehicle.vehicle.find",
];

const authenticated = [
  ...publicPerms,
  "api::module.module.find",
  "plugin::users-permissions.user.me",
];

export default {
  roles: {
    public: publicPerms,
    authenticated,
  },
};
