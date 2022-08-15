import { EVENT_ID, EVENT_UUID, TRAVEL_ID, USER, USER_ID } from "../constants";
import { EditPassengerInput, PassengerInput } from "../graphql";
import { sdk } from "../lib/gqlSdk";

test("createPassenger add a new passenger to event's waiting list", async () => {
  const passenger: PassengerInput = {
    name: "Oki Doki",
    email: "okidoki@octree.ch",
    location: "Church place",
  };
  const createPassengerRequest = sdk.createPassenger({
    passenger: { ...passenger, event: EVENT_ID },
  });

  await expect(createPassengerRequest).resolves.toMatchObject({
    createPassenger: {
      passenger,
    },
  });

  const getEventRequest = sdk.eventByUUID({
    uuid: EVENT_UUID,
  });
  await expect(getEventRequest).resolves.toMatchObject({
    eventByUUID: {
      waitingPassengers: [
        {
          ...passenger,
          user: null,
          id: "1",
        },
      ],
    },
  });
});

test("createPassenger add a new known user to event's waiting list", async () => {
  const passenger: PassengerInput = {
    name: "Test User",
    email: "test@octree.ch",
    location: "Train station",
    user: USER_ID,
  };
  const createPassengerRequest = sdk.createPassenger({
    passenger: { ...passenger, event: EVENT_ID },
  });

  await expect(createPassengerRequest).resolves.toMatchObject({
    createPassenger: {
      passenger: {
        ...passenger,
        user: {
          id: USER.id,
          firstName: USER.firstName,
          lastName: USER.lastName,
        },
      },
    },
  });

  const getEventRequest = sdk.eventByUUID({
    uuid: EVENT_UUID,
  });
  await expect(getEventRequest).resolves.toMatchObject({
    eventByUUID: {
      waitingPassengers: expect.arrayContaining([
        expect.objectContaining({
          ...passenger,
          user: {
            id: USER.id,
            firstName: USER.firstName,
            lastName: USER.lastName,
          },
        }),
      ]),
    },
  });
});

test("createPassenger add a new passenger to travel's passengers list", async () => {
  const passenger: PassengerInput = {
    name: "Oki Doki",
    email: "okidoki@octree.ch",
    location: "Church place",
  };
  const createPassengerRequest = sdk.createPassenger({
    passenger: { ...passenger, travel: TRAVEL_ID },
  });

  await expect(createPassengerRequest).resolves.toMatchObject({
    createPassenger: {
      passenger,
    },
  });

  const getEventRequest = sdk.eventByUUID({
    uuid: EVENT_UUID,
  });
  await expect(getEventRequest).resolves.toMatchObject({
    eventByUUID: {
      travels: [
        {
          id: TRAVEL_ID,
          passengers: [
            {
              name: passenger.name,
              location: passenger.location,
              user: null,
            },
          ],
        },
      ],
    },
  });
});

test("updatePassenger returns updated passenger", async () => {
  const passengerUpdate: EditPassengerInput = {
    name: "Updated name",
  };
  const request = sdk.updatePassenger({
    id: "1",
    passengerUpdate,
  });

  await expect(request).resolves.toMatchObject({
    updatePassenger: {
      passenger: expect.objectContaining({
        name: passengerUpdate.name,
        email: "okidoki@octree.ch",
      }),
    },
  });
});

test("deletePassenger returns ID of deleted passenger", async () => {
  const request = sdk.deletePassenger({
    id: "1",
  });

  await expect(request).resolves.toMatchObject({
    deletePassenger: {
      passenger: {
        id: "1",
      },
    },
  });
});
