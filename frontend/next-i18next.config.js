/** @type {import('next-i18next').UserConfig} */

const {FALLBACK_LANGUAGE = 'en'} = process.env;

module.exports = {
  i18n: {
    defaultLocale: FALLBACK_LANGUAGE,
    locales: [...new Set([FALLBACK_LANGUAGE, 'en', 'fr', 'de', 'nl', 'it'])],
    localeDetection: false,
  },
  // Load same lang file for every namespaces
  localePath: './locales',
  localeExtension: 'json',
  localeStructure: '{{lng}}',
  ns: ['common'],
  localeDetection: true,
  fallbackLng: ['en', 'fr'],
  trailingSlash: true,
  serializeConfig: false,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
};
