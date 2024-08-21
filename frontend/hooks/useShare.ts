import {useTranslation} from 'next-i18next';
import {Enum_Userspermissionsuser_Lang as SupportedLocales} from '../generated/graphql';
import useToastStore from '../stores/useToastStore';

const FALLBACK_LANGUAGE = process.env.FALLBACK_LANGUAGE || 'en';

const navigatorHasShareCapability =
  typeof navigator !== 'undefined' && !!navigator.share;
const navigatorHasClipboardCapability =
  typeof navigator !== 'undefined' && !!navigator.clipboard;

const useShare = () => {
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);

  return {
    navigatorHasShareCapability,
    share: async ({title}) => {
      const url = typeof window !== 'undefined' ? window.location.href : '';
      if (!url || !title) return null;
      const splittedUrl = url.split('/');
      const localeParamIndex = splittedUrl.findIndex(
        member => SupportedLocales[member]
      );
      const urlCopy = [...splittedUrl];
      urlCopy[localeParamIndex] = FALLBACK_LANGUAGE;
      const withDefaultLocaleURL = urlCopy.join('/');
      const isPhone = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      // If navigator share capability and a phone
      if (navigatorHasShareCapability && isPhone) {
        return await navigator.share({
          title,
          url: withDefaultLocaleURL,
        });
      }
      // Else copy URL in clipboard
      else if (navigatorHasClipboardCapability) {
        await navigator.clipboard.writeText(withDefaultLocaleURL);
        addToast(t('event.actions.copied'));
        return true;
      }
      addToast(t('event.actions.noShareCapability'));
    },
  };
};

export default useShare;
