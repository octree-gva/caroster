import fs from "node:fs/promises";
import _ from "lodash";
import { marked } from "marked";
import { getHTML } from "../utils/layout";

const langs = ["en", "fr", "nl"];

let locales: Record<
  string,
  {
    template: Record<"footer" | "carosterLink", string>;
    notifications: Record<string, { title: string; content: string }>;
  }
> = null;

export default () => ({
  async loadContentFiles() {
    strapi.log.info(
      `🌐 Load localized content files for email notifications...`
    );
    const content = await Promise.all(
      langs.map(async (lang) => {
        const langFile = await fs.readFile(
          `${__dirname}/../locales/${lang}.json`,
          "utf-8"
        );
        return [lang, JSON.parse(langFile)];
      })
    );
    locales = Object.fromEntries(content);
    return locales;
  },

  async sendEmailNotif(
    to: string,
    notifType: string,
    lang: string,
    variables?: object
  ) {
    try {
      const emailTemplate = await this.getEmailTemplate(
        notifType,
        lang,
        variables
      );
      if (!emailTemplate)
        throw new Error(`No locale found for ${notifType} in ${lang}`);

      strapi.log.debug(
        `Send email notification of type ${notifType} to ${to} (lang: ${lang})`
      );
      await strapi.plugins["email"].services.email.send({
        to,
        ...emailTemplate,
      });
    } catch (error) {
      strapi.log.error(`Can't send email notification to ${to}`);
      console.error(error);
    }
  },

  async getEmailTemplate(notifType: string, lang: string, variables = {}) {
    let notif = locales?.[lang]?.notifications?.[notifType];

    if (!notif) {
      strapi.log.warn(
        `No email notification locale found for type '${notifType}' and lang '${lang}'`
      );
      notif = locales?.["en"]?.notifications?.[notifType];
      if (!notif) return null;
    }

    try {
      const subject = _.template(notif.title)({
        ...variables,
        host: strapi.config.server.url,
      });
      const mdContent = _.template(notif.content)({
        ...variables,
        host: strapi.config.server.url,
      });
      const mdFooter = locales?.[lang]?.template.footer;
      const carosterLink = locales?.[lang]?.template.carosterLink;
      const htmlContent = await marked.parse(mdContent, { breaks: true });
      const htmlFooter = await marked.parse(mdFooter, { breaks: true });
      const html = getHTML({htmlContent, htmlFooter, carosterLink});

      return {
        subject,
        html,
        text: mdContent,
      };
    } catch (error) {
      strapi.log.error(
        `Can't parse email notification locale for type '${notifType}' and lang '${lang}'`
      );
      console.error(error);
      return null;
    }
  },
});
