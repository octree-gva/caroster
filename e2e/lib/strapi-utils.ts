import fs from "fs";
import { USER, USER_PASSWORD } from "../constants";
import { sdk } from "./gqlSdk";
import { wait } from "./wait";

export const restartStrapi = async () => {
  await fs.promises.writeFile("../backend/restart.test", "Restart Strapi");
  console.log(`Wait for Strapi to restart`);
  await wait(6000);
  await waitForStrapi();
};

export const getJwtToken = async () => {
  const { login } = await sdk.login({
    identifier: USER.email as string,
    password: USER_PASSWORD,
  });
  return login?.jwt;
};

const waitForStrapi = async () => {
  let isAvailable = false;
  while (!isAvailable) {
    await wait(1000);
    try {
      await fetch("http://localhost:1337/graphql");
      isAvailable = true;
    } catch (error) {
      console.log("Strapi is not ready");
    }
  }
  console.log("STRAPI IS STARTED");
};
