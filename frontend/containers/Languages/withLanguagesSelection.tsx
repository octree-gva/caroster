import {useEffect} from 'react';
import useLangStore from '../../stores/useLangStore';
import useProfile from '../../hooks/useProfile';
import {
  useUpdateMeMutation,
  Enum_Userspermissionsuser_Lang,
} from '../../generated/graphql';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

type LangFunction = (lang: Enum_Userspermissionsuser_Lang) => void;

export interface LanguageSelectionComponentProps {
  language: Enum_Userspermissionsuser_Lang;
  setLanguage: LangFunction;
  onConfirmCallback: LangFunction;
}

const withLanguagesSelection =
  (
    LanguageSelectionComponent: (
      args: LanguageSelectionComponentProps
    ) => JSX.Element
  ) =>
  () => {
    const {i18n} = useTranslation();
    const language = useLangStore(s => s.language);
    const setLanguage = useLangStore(s => s.setLanguage);
    const {profile, connected} = useProfile();
    const [updateProfile] = useUpdateMeMutation();

    useEffect(() => {
      if (i18n.language === 'en')
        setLanguage(Enum_Userspermissionsuser_Lang.En);
    }, []);

    useEffect(() => {
      const momentLang = language === 'FR' ? 'fr-ch' : 'en';
      moment.locale(momentLang);
      i18n.changeLanguage(language?.toLowerCase());
    }, [language]);

    useEffect(() => {
      if (profile?.lang) setLanguage(profile.lang);
    }, [profile]);

    const onConfirmCallback = (lang: Enum_Userspermissionsuser_Lang) => {
      if (connected) {
        updateProfile({
          variables: {
            userUpdate: {
              lang,
            },
          },
        });
      }
    };

    return (
      <LanguageSelectionComponent
        language={language}
        setLanguage={setLanguage}
        onConfirmCallback={onConfirmCallback}
      />
    );
  };

export default withLanguagesSelection;
