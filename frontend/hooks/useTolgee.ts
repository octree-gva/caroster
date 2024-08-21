import i18n from 'i18next';
import {withTolgee, Tolgee, I18nextPlugin, DevTools} from '@tolgee/i18next';
import useLocale from './useLocale';

const tolgee = Tolgee()
  .use(DevTools())
  .use(I18nextPlugin())
  .init({
    apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL || 'https://app.tolgee.io',
    apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
    ns: ['common'],
  });

const useTolgee = () => {
  const {locale} = useLocale();
  return withTolgee(i18n, tolgee).init({
    lng: locale,
    fallbackLng: 'fr',
  });
};

export default useTolgee;
