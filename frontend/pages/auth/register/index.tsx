import Link from 'next/link';
import Cookies from 'cookies';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import Layout from '../../../layouts/Centered';
import Logo from '../../../components/Logo';
import LanguagesIcon from '../../../containers/Languages/Icon';
import SignUpActions from '../../../containers/MailSignUpForm/SignupActions';
import LoginGoogle from '../../../containers/LoginGoogle';
import pageUtils from '../../../lib/pageUtils';

const MailSignup = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <Layout menuTitle={t('signup.title')} displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: theme.spacing(0, 6),
          }}
        >
          <Typography variant="h6" align="center">
            {t('signup.create')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '15rem',
              mt: 4,
            }}
          >
            <Link href="/auth/register/mail" passHref style={{width: '100%'}}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                sx={{mb: 2}}
              >
                {t('signup.with_mail')}
              </Button>
            </Link>
            <LoginGoogle />
          </Box>
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              margin: theme.spacing(5, 0, 2, 0),
            }}
          >
            <Divider />
          </Box>
          <Typography align="center" variant="body2">
            {t('signup.account_already')}
          </Typography>
        </CardContent>
        <SignUpActions />
        <LanguagesIcon />
      </Card>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  return pageUtils.getServerSideProps(async ctx => {
    const redirectPath = ctx.query?.redirectPath;
    if (redirectPath) {
      const cookies = new Cookies(ctx.req, ctx.res);
      cookies.set('redirectPath', redirectPath);
    }
  })(context);
};

export default MailSignup;
