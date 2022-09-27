import {useSettingQuery, SettingQuery} from '../generated/graphql';
import useLocale from './useLocale';

const defaulData: SettingQuery = {};

const useSettings = () => {
  const {locale} = useLocale();
  const {data = defaulData} = useSettingQuery({variables: {locale}});
  return data?.setting?.data?.attributes || {};
};

export default useSettings;
