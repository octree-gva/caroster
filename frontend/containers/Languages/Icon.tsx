import {useState} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useTranslation} from 'next-i18next';
import withLanguagesSelection, {
  LanguageSelectionComponentProps,
} from './withLanguagesSelection';
import {langLocales, langs} from '../../locales/constants';

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

  const onConfirm = (lang: (typeof langs)[number]) => {
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
          size="large"
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
        {langs.map(lang => (
          <MenuItem
            key={lang}
            disabled={language === lang}
            onClick={() => onConfirm(lang)}
          >
            {langLocales[lang]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default withLanguagesSelection(IconLanguageSelection);
