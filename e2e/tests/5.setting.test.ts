import { SETTING_EN, SETTING_FR } from "../constants";
import { sdk } from "../lib/gqlSdk";

test("settings are returned in french", async () => {
  const request = sdk.setting({ locale: "fr-CH" });

  await expect(request).resolves.toMatchObject({
    setting: {
      data: {
        id: expect.stringMatching(/\d/),
        attributes: SETTING_FR,
      },
    },
  });
});

test("settings are returned in english", async () => {
  const request = sdk.setting({ locale: "en" });

  await expect(request).resolves.toMatchObject({
    setting: {
      data: {
        id: expect.stringMatching(/\d/),
        attributes: SETTING_EN,
      },
    },
  });
});
