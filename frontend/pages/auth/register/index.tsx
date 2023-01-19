import Link from 'next/link';
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
          <Typography variant="h6" align="center">
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
              margin: theme.spacing(5, 0, 2, 0),
            }}
          >
            <Markdown
              sx={{
                marginBottom: theme.spacing(5), 
                '& a': {
                  color: theme.palette.primary.main,
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

export async function getServerSideProps(props) {
  return props
}

export default MailSignup;
