import { factories } from "@strapi/strapi";
import pMap from "p-map";
import {
  Coordinates,
  calculateHaversineDistance,
} from "../../../utils/geography";

export default factories.createCoreService(
  "api::trip-alert.trip-alert",
  ({ strapi }) => ({
    async sendTripAlerts(eventId: string, travel) {
      const eventTripAlerts = await strapi.entityService.findMany(
        "api::trip-alert.trip-alert",
        {
          filters: {
            enabled: true,
            event: { id: eventId },
          },
          populate: ["user"],
        }
      );
      const filteredTripAlerts = eventTripAlerts.filter((tripAlert) => {
        // If alert has no geographical info, send alert on each new trip
        if (!tripAlert.latitude || !tripAlert.longitude || !tripAlert.radius)
          return true;
        // If travel has no geographical info, send alert to all
        else if (!travel.meeting_latitude || !travel.meeting_longitude)
          return true;

        // Else, check if new travel is in alert area
        const alertCoordinates: Coordinates = [
          tripAlert.latitude,
          tripAlert.longitude,
        ];
        const travelCoordinates: Coordinates = [
          travel.meeting_latitude,
          travel.meeting_longitude,
        ];
        const distance = calculateHaversineDistance(
          travelCoordinates,
          alertCoordinates
        );
        return distance <= tripAlert.radius;
      });

      const vehicleName =
        travel.firstname && travel.lastname
          ? `${travel.firstname} ${travel.lastname[0]}.`
          : travel.vehicleName;
      await pMap(filteredTripAlerts, async (tripAlert) => {
        strapi.log.debug(
          `Create trip alert notification for user ${tripAlert.user.id}`
        );
        strapi.entityService.create("api::notification.notification", {
          data: {
            type: "NewTripAlert",
            event: eventId,
            user: tripAlert.user.id,
            payload: { travel, vehicleName },
          },
        });
      });
    },
  })
);
