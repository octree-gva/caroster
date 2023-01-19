const {DEFAULT_LOCALE = 'share'} = process.env;

module.exports = {
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [DEFAULT_LOCALE, 'en', 'fr'],
    localeDetection: false,
  },
  trailingSlash: true,

  fallbackLng: {
    default: ['fr'],
    'fr-CH': ['fr'],
  },
};
