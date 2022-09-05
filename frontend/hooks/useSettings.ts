import {useTranslation} from 'react-i18next';
import {useSettingQuery, SettingQuery} from '../generated/graphql';

const defaulData: SettingQuery = {};

const useSettings = () => {
  const {i18n} = useTranslation();
  const locale = i18n.language;
  const {data = defaulData} = useSettingQuery({variables: {locale}});
  return data?.setting?.data?.attributes;
};

export default useSettings;
