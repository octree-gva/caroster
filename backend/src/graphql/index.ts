import authExtensions from "./auth";
import eventExtensions from "./event";
import userExtensions from "./user";
import travelExtensions from "./travel";
import vehicleExtensions from "./vehicle";
import passengerExtensions from "./passenger";
import notificationExtensions from "./notification";

export default ({ strapi }) => {
  const extService = strapi.plugin("graphql").service("extension");
  authExtensions.forEach(extService.use);
  eventExtensions.forEach(extService.use);
  userExtensions.forEach(extService.use);
  travelExtensions.forEach(extService.use);
  vehicleExtensions.forEach(extService.use);
  passengerExtensions.forEach(extService.use);
  notificationExtensions.forEach(extService.use);

  // Disable shadow CRUD
  /// Fields
  extService.shadowCRUD("api::event.event").field("users").disableOutput();

  /// Methods
  extService.shadowCRUD("api::event.event").disableActions(["find"]);
  extService.shadowCRUD("api::travel.travel").disableActions(["find"]);
  extService.shadowCRUD("api::passenger.passenger").disableActions(["find"]);
  extService.shadowCRUD("api::vehicle.vehicle").disableActions(["find"]);
  extService
    .shadowCRUD("plugin::users-permissions.user")
    .disableActions(["find"]);
};
