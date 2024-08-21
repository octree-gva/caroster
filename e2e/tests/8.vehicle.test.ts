import { USER_ID, VEHICLE, VEHICLE_ID } from "../constants";
import { sdk } from "../lib/gqlSdk";
import { getJwtToken } from "../lib/strapi-utils";

test("findUserVehicles returns vehicles of logged user", async () => {
  const jwt = await getJwtToken();
  const request = sdk.findUserVehicles(undefined, {
    authorization: `Bearer ${jwt}`,
  });

  await expect(request).resolves.toMatchObject({
    me: {
      id: USER_ID,
      profile: {
        vehicles: {
          data: expect.arrayContaining([
            {
              id: VEHICLE_ID,
              attributes: {
                name: VEHICLE.name,
                phoneCountry: null,
                phone_number: VEHICLE.phone_number,
                seats: VEHICLE.seats,
              },
            },
          ]),
        },
      },
    },
  });
});

test("findUserVehicles throws error if no auth", async () => {
  const request = sdk.findUserVehicles();
  await expect(request).rejects.toThrow("Forbidden access:");
});

test("deleteVehicle returns ID of deleted vehicle", async () => {
  const jwt = await getJwtToken();
  const request = sdk.deleteVehicle(
    { id: VEHICLE_ID },
    {
      authorization: `Bearer ${jwt}`,
    }
  );

  await expect(request).resolves.toMatchObject({
    deleteVehicle: {
      data: {
        id: VEHICLE_ID,
        attributes: {
          name: expect.any(String),
        },
      },
    },
  });
});

test("deleteVehicle fails if logged user doesn't own the vehicle", async () => {
  const jwt = await getJwtToken();
  const request = sdk.deleteVehicle(
    { id: "2" },
    {
      authorization: `Bearer ${jwt}`,
    }
  );

  await expect(request).rejects.toThrow();
});
