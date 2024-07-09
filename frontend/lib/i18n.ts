import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import 'moment/min/locales';
import moment from 'moment';
import {InContextTools} from '@tolgee/web/tools';
import {withTolgee, Tolgee, I18nextPlugin, BackendFetch} from '@tolgee/i18next';
import {Enum_Userspermissionsuser_Lang as SupportedLocales} from '../generated/graphql';
import translationFr from '../locales/fr.json';
import translationEn from '../locales/en.json';
import translationNl from '../locales/nl.json';

const resources = {
  en: {
    translation: translationEn,
  },
  fr: {
    translation: translationFr,
  },

  nl: {
    translation: translationNl,
  },
};

const tolgee = Tolgee()
  .use(InContextTools())
  .use(I18nextPlugin())
  .init({
    // for development
    apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
    apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
    ns: ['translation'],
  });

export const initI18Next = (locale: SupportedLocales) => {
  withTolgee(i18n, tolgee)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: locale,
      supportedLngs: ['fr', 'en', 'nl'],
      fallbackLng: 'en',
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
  moment.locale(i18n.language);
};

export default i18n;
