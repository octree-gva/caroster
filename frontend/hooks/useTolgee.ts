import {withTolgee, Tolgee, I18nextPlugin, DevTools} from '@tolgee/i18next';
import useLocale from './useLocale';
import {useTranslation} from 'next-i18next';
import {useEffect} from 'react';

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
  const {i18n} = useTranslation();

  useEffect(() => {
    const isChrome =
      window.navigator.vendor?.startsWith('Google') ||
      // @ts-expect-error
      window.navigator.userAgentData?.brands.some(brand =>
        brand.brand.startsWith('Chrom')
      );
    if (isChrome) {
      console.info(`Chrome recognized. Load Tolgee.`);
      withTolgee(i18n, tolgee).init({
        lng: locale,
        fallbackLng: 'en',
      });
    }
  }, []);
};

export default useTolgee;
