import {useSettingQuery, SettingQuery} from '../generated/graphql';
import useLangStore from '../stores/useLangStore';

const useSettings = () => {
  const language = useLangStore(s => s.language);
  const locale = {FR: 'fr', EN: 'en'}[language];
  const defaulData: SettingQuery = {};
  const {data = defaulData} = useSettingQuery({variables: {locale}});
  return data?.setting?.data?.attributes;
};

export default useSettings;
