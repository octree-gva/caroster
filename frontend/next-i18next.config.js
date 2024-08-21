/** @type {import('next-i18next').UserConfig} */

const {FALLBACK_LANGUAGE = 'en'} = process.env;

module.exports = {
  i18n: {
    defaultLocale: FALLBACK_LANGUAGE,
    locales: [...new Set([FALLBACK_LANGUAGE, 'en', 'fr', 'de', 'nl'])],
  },
  // Load same lang file for every namespaces
  localePath: (locale, _namespace) => `./locales/${locale}.json`,
  ns: ['common'],
  localeDetection: false,
  fallbackLng: ['en', 'fr'],
  trailingSlash: true,
  serializeConfig: false,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
};
