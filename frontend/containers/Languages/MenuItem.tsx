import {useState} from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import {Enum_Userspermissionsuser_Lang as SupportedLocales} from '../../generated/graphql';
import withLanguagesSelection, {
  LanguageSelectionComponentProps,
} from './withLanguagesSelection';

const Languages = ({
  language,
  onChangeLang,
}: LanguageSelectionComponentProps) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [isSelecting, setSelecting] = useState(false);

  const handleClick = event => {
    setSelecting(!isSelecting);
  };

  const onConfirm = (lang: SupportedLocales) => {
    setSelecting(false);
    onChangeLang(lang);
  };

  return (
    <Box>
      <MenuItem onClick={handleClick}>{t('menu.language')}</MenuItem>
      <MenuList
        sx={{
          visibility: isSelecting ? 'visible' : 'hidden',
          maxHeight: isSelecting ? 'none' : 0,
          padding: isSelecting ? `0 ${theme.spacing(0.5)}` : 0,
          overflow: 'hidden',
        }}
        dense
      >
        <MenuItem
          disabled={language === SupportedLocales['fr']}
          onClick={() => onConfirm(SupportedLocales['fr'])}
        >{t`languages.fr`}</MenuItem>
        <MenuItem
          disabled={language === SupportedLocales['en']}
          onClick={() => onConfirm(SupportedLocales['en'])}
        >{t`languages.en`}</MenuItem>
      </MenuList>
    </Box>
  );
};

export default withLanguagesSelection(Languages);
