import useProfile from '../../hooks/useProfile';
import {
  useUpdateMeMutation,
  Enum_Userspermissionsuser_Lang as Lang,
} from '../../generated/graphql';
import {useTranslation} from 'react-i18next';
import {changeLang} from '../../lib/i18n';

export interface LanguageSelectionComponentProps {
  language: Lang;
  Lang;
  onChangeLang: (lang: Lang) => void;
}

const withLanguagesSelection =
  (
    LanguageSelectionComponent: (
      args: LanguageSelectionComponentProps
    ) => JSX.Element
  ) =>
  props => {
    const {connected} = useProfile();
    const [updateProfile] = useUpdateMeMutation();
    const {i18n} = useTranslation();
    const language = i18n.language.toUpperCase();

    const onChangeLang = (lang: Lang) => {
      changeLang(lang);
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
        onChangeLang={onChangeLang}
        {...props}
      />
    );
  };

export default withLanguagesSelection;
