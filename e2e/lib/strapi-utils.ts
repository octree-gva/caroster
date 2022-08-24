import fs from "fs";
import { USER, USER_PASSWORD } from "../constants";
import { sdk } from "./gqlSdk";
import { wait } from "./wait";

export const restartStrapi = async () => {
  await fs.promises.writeFile("../backend/restart.test", "Restart Strapi");
  await wait(4000);
};

export const getJwtToken = async () => {
  const { login } = await sdk.login({
    identifier: USER.email as string,
    password: USER_PASSWORD,
  });
  return login?.jwt;
};
