import {useState} from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {useTranslation} from 'next-i18next';
import withLanguagesSelection, {
  LanguageSelectionComponentProps,
} from './withLanguagesSelection';
import {langLocales, langs} from '../../locales/constants';
import {ListItemIcon, ListItemText} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import theme from '../../theme';

const Languages = ({
  language,
  onChangeLang,
}: LanguageSelectionComponentProps) => {
  const {t} = useTranslation();
  const [isSelecting, setSelecting] = useState(false);

  const handleClick = event => {
    setSelecting(!isSelecting);
  };

  const onConfirm = (lang: (typeof langs)[number]) => {
    setSelecting(false);
    onChangeLang(lang);
  };

  return (
    <Box>
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText>{t('menu.language')}</ListItemText>
      </MenuItem>
      <MenuList
        sx={{
          visibility: isSelecting ? 'visible' : 'hidden',
          maxHeight: isSelecting ? 'none' : 0,
          padding: isSelecting ? `0 ${theme.spacing(0.5)}` : 0,
          overflow: 'hidden',
        }}
        dense
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
      </MenuList>
    </Box>
  );
};

export default withLanguagesSelection(Languages);
