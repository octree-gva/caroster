import Card from '@mui/material/Card';
import {useTheme} from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import {useTranslation} from 'react-i18next';
import Layout from '../../../layouts/Centered';
import Logo from '../../../components/Logo';
import LanguagesIcon from '../../../containers/Languages/Icon';
import CardContent from '@mui/material/CardContent';
import SignUpActions from '../../../containers/MailSignUpForm/SignupActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import LoginGoogle from '../../../containers/LoginGoogle';
import Link from 'next/link';
import Markdown from '../../../components/Markdown';

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
          <Typography variant="overline" component="h5" align="center">
            {t('signup.create')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              padding: {sm: theme.spacing(0, 6), xs: 0},
            }}
          >
            <Link href="/auth/register/mail" passHref>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                sx={{
                  margin: theme.spacing(8, 1, 4, 1),
                }}
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
              margin: theme.spacing(10, 0, 2, 0),
            }}
          >
            <Markdown
              sx={{
                '& a': {
                  color: 'inherit',
                },
              }}
              variant="body1"
              align="center"
            >
              {t('signup.conditions')}
            </Markdown>

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

export default MailSignup;
