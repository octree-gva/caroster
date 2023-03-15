import {useTranslation} from 'react-i18next';
import {Enum_Userspermissionsuser_Lang as SupportedLocales} from '../generated/graphql';
import useToastStore from '../stores/useToastStore';

const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'share';

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
      console.log("sharing: ", {url, title})
      if (!url || !title) return null;
      const splittedUrl = url.split('/');
      const localeParamIndex = splittedUrl.findIndex(
        member => SupportedLocales[member]
      );
      splittedUrl[localeParamIndex] = DEFAULT_LOCALE;
      const withDefaultLocaleURL = splittedUrl.join('/');
      console.log("share url: ", withDefaultLocaleURL)
      // If navigator share capability
      if (navigatorHasShareCapability) {
        console.log("share using navigator")
        return await navigator.share({
          title,
          url: withDefaultLocaleURL,
        });
      }
      // Else copy URL in clipboard
      else if (navigatorHasClipboardCapability) {
        console.log("share using clipboard")
        await navigator.clipboard.writeText(withDefaultLocaleURL);
        addToast(t('event.actions.copied'));
        return true;
      }
      addToast(t('event.actions.noShareCapability'));
    },
  };
};

export default useShare;
