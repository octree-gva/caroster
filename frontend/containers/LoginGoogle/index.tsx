import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';

const LoginGoogle = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      color="primary"
      fullWidth
      href="/api/connect/google"
    >
      <Box
        component="img"
        sx={{marginRight: theme.spacing(1)}}
        height="25px"
        src="/assets/google-icon.svg"
        alt="Google Login"
      />
      {t('signin.withGoogle')}
    </Button>
  );
};

export default LoginGoogle;
