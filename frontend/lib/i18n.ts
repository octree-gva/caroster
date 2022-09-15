import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import 'moment/locale/fr-ch';
import moment from 'moment';
import translationFr from '../locales/fr.json';
import translationEn from '../locales/en.json';
import {Enum_Userspermissionsuser_Lang as Lang} from '../generated/graphql';

const STORAGE_KEY = 'i18n-lang';

type AvailableLang = 'en' | 'fr';

const resources = {
  fr: {
    translation: translationFr,
  },
  en: {
    translation: translationEn,
  },
};

export const getNavigatorLang = (): AvailableLang => {
  if (typeof localStorage !== 'undefined') {
    const storedLang = localStorage.getItem(STORAGE_KEY);
    if (storedLang) return storedLang as AvailableLang;
  }
  if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined')
    if (navigator.language === 'fr' || navigator.language.includes('fr-'))
      return 'fr';
  return 'fr';
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getNavigatorLang(),
    supportedLngs: ['fr', 'en'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// Moment - On lang change
const changeMomentLang = (i18nLang: string) => {
  const momentLang = i18nLang === 'fr' ? 'fr-ch' : 'en';
  moment.locale(momentLang);
};

// Moment - On page load
const i18nLang = getNavigatorLang();
changeMomentLang(i18nLang);

export const changeLang = (lang: Lang) => {
  const i18nLang = lang.toLowerCase();
  i18n.changeLanguage(i18nLang);
  changeMomentLang(i18nLang);
  if (typeof localStorage !== 'undefined')
    localStorage.setItem(STORAGE_KEY, i18nLang);
};

export default i18n;
