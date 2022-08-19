import {useTranslation} from 'react-i18next';
import useToastStore from '../stores/useToastStore';

const navigatorHasShareCapability = typeof navigator !== 'undefined' && !!navigator.share;
const navigatorHasClipboardCapability = typeof navigator !== 'undefined' && !!navigator.clipboard;


const useShare = () => {
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);

  return {
    navigatorHasShareCapability,
    share: async ({url, title}) => {
      if (!url || !title) return null;
      // If navigator share capability
      if (navigatorHasShareCapability)
        return await navigator.share({
          title,
          url,
        });
      // Else copy URL in clipboard
      else if (navigatorHasClipboardCapability) {
        await navigator.clipboard.writeText(url);
        addToast(t('event.actions.copied'));
        return true;
      }
      addToast(t('event.actions.noShareCapability'));
    },
  };
};

export default useShare;
