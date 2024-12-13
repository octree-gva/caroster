import { EVENT_ID, TRAVEL, TRAVEL_ID } from "../constants";
import { TravelInput } from "../graphql";
import { sdk } from "../lib/gqlSdk";
import { getJwtToken } from "../lib/strapi-utils";

test("createTravel returns created travel", async () => {
  const travel: TravelInput = {
    vehicleName: "Test travel car",
    departureDate: "2023-08-12",
    departureTime: "13:57",
    meeting: "Test",
    seats: 3,
  };
  const request = sdk.createTravel({ travel: { ...travel, event: EVENT_ID } });

  await expect(request).resolves.toMatchObject({
    createTravel: {
      data: {
        id: expect.any(String),
        attributes: travel,
      },
    },
  });
});

test("updateTravel returns updated travel", async () => {
  const travelUpdate = {
    vehicleName: "Updated travel car name",
    seats: 12,
  };
  const request = sdk.updateTravel({ id: "1", travelUpdate });

  await expect(request).resolves.toMatchObject({
    updateTravel: {
      data: {
        id: expect.any(String),
        attributes: {
          ...travelUpdate,
          meeting: TRAVEL.meeting,
        },
      },
    },
  });
});

test("deleteTravel returns ID of deleted travel", async () => {
  const request = sdk.deleteTravel({ id: TRAVEL_ID });

  await expect(request).resolves.toMatchObject({
    deleteTravel: {
      data: {
        id: TRAVEL_ID,
      },
    },
  });
});
