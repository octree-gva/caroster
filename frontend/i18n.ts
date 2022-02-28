import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationFr from './locales/fr.json';
import translationEn from './locales/en.json';
import {Enum_Userspermissionsuser_Lang} from './generated/graphql';

const resources = {
  fr: {
    translation: translationFr,
  },
  en: {
    translation: translationEn,
  },
};

export const getUserLng = () => {
  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    if (navigator.language === 'fr' || navigator.language.includes('fr-')) {
      return Enum_Userspermissionsuser_Lang.Fr
    }
  }
  return Enum_Userspermissionsuser_Lang.En
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getUserLng(),
    supportedLngs: ['fr', 'en'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
