import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';

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
      <Box display="flex" justifyContent="center" pt={2} gap={1}>
        <Link href={`/auth/login?redirectPath=${router.asPath}`} passHref>
          <Button sx={{mr: 0.5}} variant="outlined">
            {t('event.loginToAttend.login')}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default LoginToAttend;
