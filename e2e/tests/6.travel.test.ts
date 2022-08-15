import { EVENT_ID, TRAVEL, TRAVEL_ID } from "../constants";
import { EditTravelInput, TravelInput } from "../graphql";
import { sdk } from "../lib/gqlSdk";

test("createTravel returns created travel", async () => {
  const travel: TravelInput = {
    vehicleName: "Test travel car",
    departure: "2023-08-12T13:57:40.093Z",
    meeting: "Test",
    seats: 3,
  };
  const request = sdk.createTravel({ travel: { ...travel, event: EVENT_ID } });

  await expect(request).resolves.toMatchObject({
    createTravel: {
      travel: {
        ...travel,
      },
    },
  });
});

test("updateTravel returns updated travel", async () => {
  const travelUpdate: EditTravelInput = {
    vehicleName: "Updated travel car name",
    seats: 12,
  };
  const request = sdk.updateTravel({ id: "1", travelUpdate });

  await expect(request).resolves.toMatchObject({
    updateTravel: {
      travel: {
        ...travelUpdate,
        meeting: TRAVEL.meeting,
      },
    },
  });
});

test("deleteTravel returns ID of deleted travel", async () => {
  const request = sdk.deleteTravel({ id: TRAVEL_ID });

  await expect(request).resolves.toMatchObject({
    deleteTravel: {
      travel: {
        id: TRAVEL_ID,
      },
    },
  });
});
