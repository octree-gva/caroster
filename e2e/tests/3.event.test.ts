import { EVENT, EVENT_ID, EVENT_UUID } from "../constants";
import { EventInput } from "../graphql";
import { sdk } from "../lib/gqlSdk";

test("createEvent returns created event with minimal parameters", async () => {
  const event: EventInput = {
    email: "test+event@octree.ch",
    name: "Test event",
  };
  const request = sdk.createEvent(event);

  await expect(request).resolves.toMatchObject({
    createEvent: {
      event: {
        id: expect.stringMatching(/\d/),
        waitingPassengers: [],
        ...event,
      },
    },
  });
});

test("createEvent returns created event with all parameters", async () => {
  const event: EventInput = {
    email: "test+event@octree.ch",
    name: "Test event",
    address: "Test address",
    date: "2032-10-03",
    description: "Test event description",
  };
  const request = sdk.createEvent(event);

  await expect(request).resolves.toMatchObject({
    createEvent: {
      event: {
        id: expect.stringMatching(/\d/),
        waitingPassengers: [],
        ...event,
      },
    },
  });
});

test("updateEvent returns updated event", async () => {
  const updatedName = "My Caroster event";
  const request = sdk.updateEvent({
    uuid: EVENT_UUID,
    eventUpdate: {
      name: updatedName,
    },
  });

  await expect(request).resolves.toMatchObject({
    updateEventByUUID: {
      event: {
        id: EVENT_ID,
        description: EVENT.description,
        name: updatedName,
      },
    },
  });
});

test("updateEvent returns no event if UUID doesn´t exist", async () => {
  const request = sdk.updateEvent({
    uuid: "uuid-that-not-exists",
    eventUpdate: {
      name: "random name",
    },
  });

  await expect(request).resolves.toMatchObject({
    updateEventByUUID: {
      event: null,
    },
  });
});

test("eventByUUID returns event corresponding to UUID", async () => {
  const request = sdk.eventByUUID({
    uuid: EVENT_UUID,
  });

  await expect(request).resolves.toMatchObject({
    eventByUUID: {
      id: EVENT_ID,
    },
  });
});

test("eventByUUID fails if UUID doesn't exist", async () => {
  const request = sdk.eventByUUID({
    uuid: "uuid-that-not-exists",
  });

  await expect(request).rejects.toThrow(
    "Cannot return null for non-nullable field Event.id"
  );
});
