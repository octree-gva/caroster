import {useEffect} from 'react';
import useSettings from './useSettings';

const useMatomo = () => {
  const settings = useSettings();

  useEffect(() => {
    if (settings) {
      const {matomo_script_url} = settings;
      if (matomo_script_url && typeof window !== 'undefined')
        loadMatomo(matomo_script_url);
    }
  }, [settings]);
};

const loadMatomo = (matomoScriptUrl: string) => {
  const _mtm = (window._mtm = window._mtm || []);
  _mtm.push({'mtm.startTime': new Date().getTime(), event: 'mtm.Start'});
  const element = document.createElement('script');
  const script = document.getElementsByTagName('script')[0];
  element.async = true;
  element.src = matomoScriptUrl;
  script.parentNode.insertBefore(element, script);
};

export default process.env.NODE_ENV === 'production' ? useMatomo : () => {};
