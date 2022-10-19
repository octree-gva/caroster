import {useState} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useTranslation} from 'react-i18next';
import {Enum_Userspermissionsuser_Lang as SupportedLocales} from '../../generated/graphql';
import withLanguagesSelection, {
  LanguageSelectionComponentProps,
} from './withLanguagesSelection';

const IconLanguageSelection = ({
  language,
  onChangeLang,
  displayMenu,
}: LanguageSelectionComponentProps & {displayMenu?: boolean}) => {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const onConfirm = (lang: SupportedLocales) => {
    setAnchorEl(null);
    onChangeLang(lang);
  };

  return <>
    <Box
      position="absolute"
      top={displayMenu ? 56 : 0}
      right={0}
      zIndex={1050}
      p={1}
    >
      <IconButton color="primary" aria-label="Languages" onClick={handleClick} size="large">
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
        disabled={language === SupportedLocales['fr']}
        onClick={() => onConfirm(SupportedLocales['fr'])}
      >{t`languages.fr`}</MenuItem>
      <MenuItem
        disabled={language === SupportedLocales['en']}
        onClick={() => onConfirm(SupportedLocales['en'])}
      >{t`languages.en`}</MenuItem>
    </Menu>
  </>;
};

export default withLanguagesSelection(IconLanguageSelection);
