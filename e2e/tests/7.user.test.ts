import { USER, USER_ID, USER_PASSWORD } from "../constants";
import { sdk } from "../lib/gqlSdk";
import { getJwtToken } from "../lib/strapi-utils";

test("profile returns logged user profile", async () => {
  const jwt = await getJwtToken();
  const request = sdk.profile(undefined, {
    authorization: `Bearer ${jwt}`,
  });

  await expect(request).resolves.toMatchObject({
    me: {
      id: USER_ID,
      profile: {
        ...USER,
      },
    },
  });
});

test("profile throws error if no auth", async () => {
  const request = sdk.profile();
  await expect(request).rejects.toThrow("Forbidden access");
});

test("updateMe returns updated user", async () => {
  const jwt = await getJwtToken();
  const request = sdk.updateMe(
    {
      userUpdate: {
        firstName: "Updated firstname",
      },
    },
    {
      authorization: `Bearer ${jwt}`,
    }
  );

  await expect(request).resolves.toMatchObject({
    updateMe: {
      data: {
        id: expect.any(String),
        attributes: {
          firstName: "Updated firstname",
        },
      },
    },
  });
});

test("updateMe updates password", async () => {
  const jwt = await getJwtToken();
  const request = sdk.updateMe(
    {
      userUpdate: {
        password: USER_PASSWORD,
        oldPassword: USER_PASSWORD,
      },
    },
    {
      authorization: `Bearer ${jwt}`,
    }
  );

  await expect(request).resolves.toMatchObject({
    updateMe: {
      data: {
        id: expect.any(String),
        attributes: {
          firstName: "Updated firstname",
        },
      },
    },
  });
});

test("updateMe throws error if no auth", async () => {
  const request = sdk.updateMe({
    userUpdate: {
      firstName: "Updated firstname",
    },
  });
  await expect(request).rejects.toThrow("Forbidden");
});

test("updateMe link user to an event", async () => {
  const jwt = await getJwtToken();
  const request = sdk.updateMe(
    {
      userUpdate: {
        events: ["2"],
      },
    },
    {
      authorization: `Bearer ${jwt}`,
    }
  );

  await expect(request).resolves.toMatchObject({
    updateMe: {
      data: {
        id: expect.any(String),
        attributes: {
          events: {
            data: [{ id: "1" }, { id: "2" }],
          },
        },
      },
    },
  });
});
