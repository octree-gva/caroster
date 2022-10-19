import Icon from '@mui/material/Icon';
import Button, {ButtonProps} from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import useShare from '../../hooks/useShare';

interface Props {
  title: string;
  url: string;
}

const ShareEvent = ({title, url, sx}: ButtonProps & Props) => {
  const {t} = useTranslation();
  const {share, navigatorHasShareCapability} = useShare();

  const text = navigatorHasShareCapability
    ? t('event.fields.share')
    : t('event.fields.copyLink');

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<Icon>share</Icon>}
      onClick={() => share({title, url})}
      sx={sx}
    >
      {text}
    </Button>
  );
};

export default ShareEvent;
