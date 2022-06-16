import {useEffect} from 'react';
import {useSettingLazyQuery, SettingQuery} from '../generated/graphql';
import useLangStore from '../stores/useLangStore';

const useSettings = () => {
  const language = useLangStore(s => s.language);

  const locale = {FR: 'fr', EN: 'en'}[language];

  const defaulData: SettingQuery = {};
  const [fetchSettings, {data: {setting} = defaulData}] = useSettingLazyQuery({
    variables: {locale},
  });

  useEffect(() => {
    fetchSettings();
  }, [locale]);

  return setting;
};

export default useSettings;
