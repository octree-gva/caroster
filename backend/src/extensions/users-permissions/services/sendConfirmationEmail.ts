import crypto from "crypto";
import urlJoin from "url-join";
import { getAbsoluteServerUrl, sanitize } from "@strapi/utils";

export default async (user) => {
  const userSchema = strapi.getModel("plugin::users-permissions.user");

  const confirmationToken = crypto.randomBytes(20).toString("hex");
  strapi.entityService.update("plugin::users-permissions.user", user.id, {
    data: { confirmationToken },
    populate: ["role"],
  });

  const sanitizedUserInfo = await sanitize.sanitizers.defaultSanitizeOutput(
    userSchema,
    user
  );
  const apiPrefix = strapi.config.get("api.rest.prefix");
  const url = urlJoin(
    getAbsoluteServerUrl(strapi.config),
    apiPrefix,
    "/auth/email-confirmation"
  );
  const confirmationLink = `${url}?confirmation=${confirmationToken}`;
  await strapi
    .service("api::email.email")
    .sendEmailNotif(user.email, "ConfirmEmail", user.lang, {
      confirmationToken,
      confirmationLink,
      user: sanitizedUserInfo,
    });
};
