import {useEffect} from 'react';
import {useSettingLazyQuery} from '../generated/graphql';

const useSettings = () => {
  const [fetchSettings, {data: {setting} = {}}] = useSettingLazyQuery();

  useEffect(() => {
    fetchSettings();
  }, []);

  return setting;
};

export default useSettings;
