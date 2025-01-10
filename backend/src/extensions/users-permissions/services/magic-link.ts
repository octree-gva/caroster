import jwt from "jsonwebtoken";

const MAGICLINK_SECRET = process.env.MAGICLINK_SECRET;

export const generateMagicToken = async (email: string, lang: string) => {
  const existingUser = await strapi.db
    .query("plugin::users-permissions.user")
    .findOne({
      where: { email },
    });

  if (existingUser?.provider === "google") {
    strapi.log.warn(
      `User ${email} is linked to Google account. Can't login with magic link.`
    );
    throw new Error("GoogleAccount");
  }
  if (!MAGICLINK_SECRET) throw new Error("No MAGICLINK_SECRET provided");

  return jwt.sign({ email, lang }, MAGICLINK_SECRET, { expiresIn: "20m" });
};

export const verifyMagicToken = (token: string) =>
  jwt.verify(token, MAGICLINK_SECRET);
