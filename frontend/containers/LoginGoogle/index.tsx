import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {signIn} from 'next-auth/react';
import {useTranslation} from 'next-i18next';
import theme from '../../theme';

const LoginGoogle = () => {
  const {t} = useTranslation();

  return (
    <Button
      variant="outlined"
      color="primary"
      fullWidth
      onClick={() => signIn('google', {callbackUrl: '/dashboard'})}
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
