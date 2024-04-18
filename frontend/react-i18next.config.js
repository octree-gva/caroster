const {FALLBACK_LANGUAGE = 'en'} = process.env;

module.exports = {
  i18n: {
    defaultLocale: FALLBACK_LANGUAGE,
    locales: [...new Set([FALLBACK_LANGUAGE, 'en', 'fr'])],
    localeDetection: false,
  },
  trailingSlash: true,

  fallbackLng: {
    default: FALLBACK_LANGUAGE,
    'fr-CH': ['fr'],
  },
};
