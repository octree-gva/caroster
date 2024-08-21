import Button, {ButtonProps} from '@mui/material/Button';
import {useTranslation} from 'next-i18next';
import useShare from '../../hooks/useShare';
import Box from '@mui/material/Box';

interface Props {
  title: string;
}

const ShareEvent = ({title, sx}: ButtonProps & Props) => {
  const {t} = useTranslation();
  const {share, navigatorHasShareCapability} = useShare();

  const text = navigatorHasShareCapability
    ? t('event.fields.share')
    : t('event.fields.copyLink');

  return (
    <Box textAlign="center" width={1}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => share({title})}
        sx={sx}
      >
        {text}
      </Button>
    </Box>
  );
};

export default ShareEvent;
