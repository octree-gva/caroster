import { sdk } from "../lib/gqlSdk";
import { USER, USER_PASSWORD } from "../constants";

test("login returns JWT token", async () => {
  const request = sdk.login({
    identifier: USER.username as string,
    password: USER_PASSWORD,
  });

  await expect(request).resolves.toMatchObject({
    login: {
      jwt: expect.stringMatching(/(^[\w-]*\.[\w-]*\.[\w-]*$)/),
      user: expect.objectContaining({
        id: expect.stringMatching("1"),
      }),
    },
  });
});

test("login returns bad request for erroneous credentials", async () => {
  const request = sdk.login({
    identifier: "not_exists@octree.ch",
    password: "yolo",
  });

  await expect(request).rejects.toMatchObject({
    response: {
      errors: expect.arrayContaining([
        expect.objectContaining({
          message: "Invalid identifier or password",
        }),
      ]),
    },
  });
});
