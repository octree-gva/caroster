import {useEffect} from 'react';
import {useSettingLazyQuery, SettingQuery} from '../generated/graphql';

const useSettings = () => {
  const defaulData: SettingQuery =
    {};

  const [fetchSettings, {data: {setting} = defaulData}] =
    useSettingLazyQuery();

  useEffect(() => {
    fetchSettings();
  }, []);

  return setting;
};

export default useSettings;
