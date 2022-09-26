import useProfile from '../../hooks/useProfile';
import {
  useUpdateMeMutation,
  Enum_Userspermissionsuser_Lang as Lang,
} from '../../generated/graphql';
import {useTranslation} from 'react-i18next';
import useLocale from '../../hooks/useLocale';

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
    const {changeLocale} = useLocale();
    const {i18n} = useTranslation();
    const language = i18n.language;

    const onChangeLang = async (lang: Lang) => {
      if (connected) {
        await updateProfile({
          variables: {
            userUpdate: {
              lang,
            },
          },
        });
      }
      changeLocale(lang);
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
