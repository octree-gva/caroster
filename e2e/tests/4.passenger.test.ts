import { EVENT_ID, EVENT_UUID, TRAVEL_ID, USER, USER_ID } from "../constants";
import { PassengerInput } from "../graphql";
import { sdk } from "../lib/gqlSdk";

test("createPassenger add a new passenger to event's waiting list", async () => {
  const passenger: PassengerInput = {
    name: "Test waiting list passenger",
    email: "okidoki@octree.ch",
    location: "Church place",
  };
  const createPassengerRequest = sdk.createPassenger({
    passenger: { ...passenger, event: EVENT_ID },
  });

  await expect(createPassengerRequest).resolves.toMatchObject({
    createPassenger: {
      data: {
        id: expect.stringMatching(/\d/),
        attributes: passenger,
      },
    },
  });

  const getEventRequest = sdk.eventByUUID({
    uuid: EVENT_UUID,
  });
  await expect(getEventRequest).resolves.toMatchObject({
    eventByUUID: {
      data: {
        id: expect.stringMatching(/\d/),
        attributes: {
          waitingPassengers: {
            data: [
              {
                id: expect.stringMatching(/\d/),
                attributes: { ...passenger },
              },
            ],
          },
        },
      },
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
      data: {
        attributes: {
          ...passenger,
          user: {
            data: {
              id: USER_ID,
              attributes: {
                firstName: expect.any(String),
                lastName: USER.lastName,
              },
            },
          },
        },
      },
    },
  });

  const getEventRequest = sdk.eventByUUID({
    uuid: EVENT_UUID,
  });
  await expect(getEventRequest).resolves.toMatchObject({
    eventByUUID: {
      data: {
        id: expect.stringMatching(/\d/),
        attributes: {
          waitingPassengers: {
            data: expect.arrayContaining([
              expect.any(Object),
              {
                id: expect.stringMatching(/./),
                attributes: {
                  ...passenger,
                  user: {
                    data: {
                      id: USER_ID,
                      attributes: {
                        firstName: expect.any(String),
                        lastName: USER.lastName,
                      },
                    },
                  },
                },
              },
            ]),
          },
        },
      },
    },
  });
});

test("createPassenger add a new passenger to travel's passengers list", async () => {
  const passenger: PassengerInput = {
    name: "Test travel list passenger",
    email: "okidoki@octree.ch",
    location: "Church place",
  };
  const createPassengerRequest = sdk.createPassenger({
    passenger: { ...passenger, travel: TRAVEL_ID },
  });

  await expect(createPassengerRequest).resolves.toMatchObject({
    createPassenger: {
      data: {
        id: expect.stringMatching(/\d/),
        attributes: passenger,
      },
    },
  });

  const getEventRequest = sdk.eventByUUID({
    uuid: EVENT_UUID,
  });
  await expect(getEventRequest).resolves.toMatchObject({
    eventByUUID: {
      data: {
        id: expect.stringMatching(/\d/),
        attributes: {
          travels: {
            data: [
              {
                attributes: {
                  passengers: {
                    data: [
                      {
                        id: expect.any(String),
                        attributes: {
                          name: passenger.name,
                          location: passenger.location,
                          user: null,
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
});

test("updatePassenger returns updated passenger", async () => {
  const passengerUpdate: PassengerInput = {
    name: "Updated name",
  };
  const request = sdk.updatePassenger({
    id: "1",
    passengerUpdate,
  });

  await expect(request).resolves.toMatchObject({
    updatePassenger: {
      data: {
        id: "1",
        attributes: {
          name: passengerUpdate.name,
          email: "okidoki@octree.ch",
        },
      },
    },
  });
});

test("deletePassenger returns ID of deleted passenger", async () => {
  const request = sdk.deletePassenger({
    id: "2",
  });

  await expect(request).resolves.toMatchObject({
    deletePassenger: {
      data: {
        id: "2",
      },
    },
  });
});
