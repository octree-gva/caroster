/** @type {import('i18n-unused').RunOptions} */
module.exports = {
  localesPath: 'locales',
  srcPath: '.',
  translationKeyMatcher:
    /t\(\s*["'`]?([\s\S]+?)["'`]?\s*(?:\)|,)|i18nKey="([\s\S]+?)"/gi,
};
