import {useState} from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useTranslation} from 'react-i18next';
import {Enum_Userspermissionsuser_Lang as Lang} from '../../generated/graphql';
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

  const onConfirm = (lang: Lang) => {
    setAnchorEl(null);
    onChangeLang(lang);
  };

  return (
    <>
      <Box
        position="absolute"
        top={displayMenu ? 56 : 0}
        right={0}
        zIndex={1050}
        p={1}
      >
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
          disabled={language === Lang.Fr}
          onClick={() => onConfirm(Lang.Fr)}
        >{t`languages.fr`}</MenuItem>
        <MenuItem
          disabled={language === Lang.En}
          onClick={() => onConfirm(Lang.En)}
        >{t`languages.en`}</MenuItem>
      </Menu>
    </>
  );
};

export default withLanguagesSelection(IconLanguageSelection);
