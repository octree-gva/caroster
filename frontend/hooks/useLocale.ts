import {Enum_Userspermissionsuser_Lang as SupportedLocales} from '../generated/graphql';
import {useRouter} from 'next/router';
import moment from 'moment';
import {setCookie} from '../lib/cookies';
import {useEffect} from 'react';

// Import moment locales
import 'moment/locale/fr';
import 'moment/locale/de';
import 'moment/locale/nl';

const defaultLocale = SupportedLocales['en'];

const useLocale = (): {
  locale: SupportedLocales;
  changeLocale: (locale: SupportedLocales) => void;
} => {
  const {pathname, query, asPath, push, locale} = useRouter();

  const changeLocale = (newLocale: SupportedLocales) => {
    moment.locale(newLocale);
    setCookie('NEXT_LOCALE', newLocale);
    push({pathname, query}, asPath, {locale: newLocale});
  };

  useEffect(() => {
    if (!SupportedLocales[locale]) changeLocale(defaultLocale);
  }, [locale]);

  return {
    changeLocale,
    locale: SupportedLocales[locale] || defaultLocale,
  };
};

export default useLocale;
