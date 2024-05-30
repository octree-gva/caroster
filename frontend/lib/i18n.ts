import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import 'moment/min/locales';
import moment from 'moment';
import {Enum_Userspermissionsuser_Lang as SupportedLocales} from '../generated/graphql';
import translationFr from '../locales/fr.json';
import translationEn from '../locales/en.json';
import translationNl from '../locales/nl.json';

const resources = {
  fr: {
    translation: translationFr,
  },
  en: {
    translation: translationEn,
  },
  nl: {
    translation: translationNl,
  },
};

export const initI18Next = (locale: SupportedLocales) => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: locale,
      supportedLngs: ['fr', 'en', 'nl'],
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
  moment.locale(i18n.language);
};

export default i18n;
