import {useEffect} from 'react';
import useLangStore from '../../stores/useLangStore';
import useProfile from '../../hooks/useProfile';
import {
  useUpdateMeMutation,
  Enum_Userspermissionsuser_Lang,
} from '../../generated/graphql';

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
    const language = useLangStore(s => s.language);
    const setLanguage = useLangStore(s => s.setLanguage);
    const {profile, connected} = useProfile();
    const [updateProfile] = useUpdateMeMutation();

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
