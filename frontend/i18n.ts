import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationFr from './locales/fr.json';
import translationEn from './locales/en.json';

const resources = {
  fr: {
    translation: translationFr,
  },
  en: {
    translation: translationEn,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fr',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
