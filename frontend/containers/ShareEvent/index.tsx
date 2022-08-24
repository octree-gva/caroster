import Icon from '@material-ui/core/Icon';
import Button, {ButtonProps} from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import useShare from '../../hooks/useShare';

interface Props {
  title: string;
  url: string;
  className?: string;
}

const ShareEvent = ({title, url, className}: ButtonProps & Props) => {
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
      className={className}
    >
      {text}
    </Button>
  );
};

export default ShareEvent;
