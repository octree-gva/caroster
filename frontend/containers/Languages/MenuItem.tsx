import {useState} from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {Enum_Userspermissionsuser_Lang as Lang} from '../../generated/graphql';
import withLanguagesSelection, {
  LanguageSelectionComponentProps,
} from './withLanguagesSelection';

const Languages = ({
  language,
  onChangeLang,
}: LanguageSelectionComponentProps) => {
  const {t} = useTranslation();
  const [isSelecting, setSelecting] = useState(false);
  const {languagesList} = useStyles({isSelecting});

  const handleClick = event => {
    setSelecting(!isSelecting);
  };

  const onConfirm = (lang: Lang) => {
    setSelecting(false);
    onChangeLang(lang);
  };

  return (
    <>
      <MenuItem onClick={handleClick}>{t('menu.language')}</MenuItem>
      <MenuList className={languagesList} dense>
        <MenuItem
          disabled={language === Lang.Fr}
          onClick={() => onConfirm(Lang.Fr)}
        >{t`languages.fr`}</MenuItem>
        <MenuItem
          disabled={language === Lang.En}
          onClick={() => onConfirm(Lang.En)}
        >{t`languages.en`}</MenuItem>
      </MenuList>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  languagesList: ({isSelecting}: {isSelecting: boolean}) => ({
    visibility: isSelecting ? 'visible' : 'hidden',
    maxHeight: isSelecting ? 'none' : 0,
    padding: isSelecting ? `0 ${theme.spacing(0.5)}px` : 0,
    overflow: 'hidden',
  }),
}));

export default withLanguagesSelection(Languages);
