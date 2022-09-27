import {Enum_Userspermissionsuser_Lang as SupportedLocales} from '../generated/graphql';
import {useRouter} from 'next/router';
import moment from 'moment';
import {setCookie} from '../lib/cookies';

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

  if (SupportedLocales[locale]) {
    return {locale: SupportedLocales[locale], changeLocale};
  }

  const defaultLocale = SupportedLocales['en'];
  changeLocale(defaultLocale);
  return {locale: defaultLocale, changeLocale};
};

export default useLocale;
