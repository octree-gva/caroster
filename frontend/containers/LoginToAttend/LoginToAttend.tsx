import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';

const LoginToAttend = ({title}) => {
  const {t} = useTranslation();
  const router = useRouter();

  return (
    <Box my={4} mx="auto" maxWidth="100%" width={340}>
      <Typography variant="h6" align="center" color="textSecondary">
        {title}
      </Typography>
      <Typography
        sx={{whiteSpace: 'pre-line', mt: 1}}
        align="center"
        color="textSecondary"
      >
        {t('event.loginToAttend.desc')}
      </Typography>
      <Box display='flex' justifyContent='space-between' pt={2} gap={1}>
        <Link
          href={`/auth/login?redirectPath=${router.asPath}`}
          passHref
          style={{width: '100%'}}
        >
          <Button fullWidth sx={{mr: 0.5}} variant="outlined">
            {t('event.loginToAttend.login')}
          </Button>
        </Link>
        <Link
          href={`/auth/register?redirectPath=${router.asPath}`}
          passHref
          style={{width: '100%'}}
        >
          <Button fullWidth sx={{ml: 0.5}} variant="contained">
            {t('event.loginToAttend.signup')}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default LoginToAttend;
