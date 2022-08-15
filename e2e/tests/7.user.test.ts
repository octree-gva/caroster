import { USER, USER_ID } from "../constants";
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
  await expect(request).rejects.toThrow("no_user");
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
      user: {
        id: USER_ID,
        firstName: "Updated firstname",
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
