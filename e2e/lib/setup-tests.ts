import fs from "fs";
import { DATABASE_PATH, DATABASE_TEMPLATE_PATH } from "../constants";
import { restartStrapi } from "./strapi-utils";

export default async () => {
  console.log("\nPrepare Strapi test database");
  try {
    await fs.promises.unlink(DATABASE_PATH);
  } catch (error) {
    console.error(error);
  }
  try {
    await fs.promises.copyFile(DATABASE_TEMPLATE_PATH, DATABASE_PATH);
    console.log(`Database ${DATABASE_PATH} has been reinitialized`);
    await restartStrapi();
  } catch (error) {
    console.error(error);
  }
};
