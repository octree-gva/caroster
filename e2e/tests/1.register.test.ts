import { sdk } from "../lib/gqlSdk";

test("register creates a new user", async () => {
  const userRandomId = randomInt();
  const user = {
    email: `test+${userRandomId}@test.com`,
    username: `testregister-${userRandomId}`,
    firstName: `firstname-${userRandomId}`,
    lastName: `lastname-${userRandomId}`,
    lang: "fr",
    password: "TestPassword34",
  };
  const request = sdk.register({
    user,
  });

  await expect(request).resolves.toMatchObject({
    register: expect.objectContaining({
      jwt: expect.stringMatching(/(^[\w-]*\.[\w-]*\.[\w-]*$)/),
      user: expect.objectContaining({
        id: expect.stringMatching(/\d/),
        email: `test+${userRandomId}@test.com`,
      }),
    }),
  });
});

const randomInt = () => Math.floor(Math.random() * 10000);
