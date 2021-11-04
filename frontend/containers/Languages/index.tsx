import {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useTranslation} from 'react-i18next';
import useLangStore from '../../stores/useLangStore';
import useProfile from '../../hooks/useProfile';
import {
  useUpdateMeMutation,
  Enum_Userspermissionsuser_Lang,
} from '../../generated/graphql';
import moment from 'moment';

const Languages = () => {
  const {t, i18n} = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const language = useLangStore(s => s.language);
  const setLanguage = useLangStore(s => s.setLanguage);
  const {profile, connected} = useProfile();
  const [updateProfile] = useUpdateMeMutation();

  useEffect(() => {
    const momentLang = language === 'FR' ? 'fr-ch' : 'en';
    moment.locale(momentLang);
    i18n.changeLanguage(language?.toLowerCase());
  }, [language]);

  useEffect(() => {
    if (profile) setLanguage(profile.lang);
  }, [profile]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const onConfirm = (lang: Enum_Userspermissionsuser_Lang) => {
    setLanguage(lang);
    setAnchorEl(null);

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
      <Box p={1} position="fixed" bottom={0} left={0} zIndex={1050}>
        <IconButton
          color="primary"
          aria-label="Languages"
          onClick={handleClick}
        >
          <Icon>language</Icon>
        </IconButton>
      </Box>
      <Menu
        id="LanguagesMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          disabled={language === Enum_Userspermissionsuser_Lang.Fr}
          onClick={() => onConfirm(Enum_Userspermissionsuser_Lang.Fr)}
        >{t`languages.fr`}</MenuItem>
        <MenuItem
          disabled={language === Enum_Userspermissionsuser_Lang.En}
          onClick={() => onConfirm(Enum_Userspermissionsuser_Lang.En)}
        >{t`languages.en`}</MenuItem>
      </Menu>
    </>
  );
};

export default Languages;
