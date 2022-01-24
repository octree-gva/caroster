import {useState, useEffect} from 'react';
import moment from 'moment';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import useLangStore from '../../stores/useLangStore';
import useProfile from '../../hooks/useProfile';
import {
  useUpdateMeMutation,
  Enum_Userspermissionsuser_Lang,
} from '../../generated/graphql';

const Languages = () => {
  const {t, i18n} = useTranslation();
  const [isSelecting, setSelecting] = useState(false);
  const language = useLangStore(s => s.language);
  const setLanguage = useLangStore(s => s.setLanguage);
  const {profile, connected} = useProfile();
  const [updateProfile] = useUpdateMeMutation();
  const { languagesList } = useStyles({ isSelecting });

  useEffect(() => {
    if (navigator?.language === 'en')
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

  const handleClick = event => {
    setSelecting(!isSelecting);
  };

  const onConfirm = (lang: Enum_Userspermissionsuser_Lang) => {
    setLanguage(lang);
    setSelecting(false);

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
    <>
      <MenuItem onClick={handleClick} >
        {t('menu.language')}
      </MenuItem>
      <MenuList className={languagesList} dense>
        <MenuItem
          disabled={language === Enum_Userspermissionsuser_Lang.Fr}
          onClick={() => onConfirm(Enum_Userspermissionsuser_Lang.Fr)}
        >{t`languages.fr`}</MenuItem>
        <MenuItem
          disabled={language === Enum_Userspermissionsuser_Lang.En}
          onClick={() => onConfirm(Enum_Userspermissionsuser_Lang.En)}
        >{t`languages.en`}</MenuItem>
      </MenuList>
    </>
  );
};


const useStyles = makeStyles(theme => ({
  languagesList: ({ isSelecting }: { isSelecting: boolean }) => ({
    visibility: isSelecting ? 'visible' : 'hidden',
    maxHeight: isSelecting ? 'none' : 0, 
    padding: isSelecting ? `0 ${theme.spacing(.5)}px` : 0, 
    overflow: 'hidden', 
  }),
}));

export default Languages;
