import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/Centered';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';
import Logo from '../../components/Logo';
import {getSession} from 'next-auth/react';
import pageUtils from '../../lib/pageUtils';
import Cookies from 'cookies';
import {useState} from 'react';
import LoginGoogle from '../../containers/LoginGoogle';
import {useSendMagicLinkMutation} from '../../generated/graphql';

interface Props {
  error?: string;
}

const Login = (props: Props) => {
  const {error} = props;
  const {t, i18n} = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [sendMagicLink] = useSendMagicLinkMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      if (email) await sendMagicLink({variables: {email, lang: i18n.language}});
      setSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout menuTitle={t('signin.title')} displayMenu={false}>
      <Container maxWidth="xs">
        <Card sx={{pt: 2, width: '100%'}}>
          <CardMedia component={Logo} />

          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6" align="center">
                {t('signin.title')}
              </Typography>
              {error && (
                <FormHelperText error sx={{textAlign: 'center'}}>
                  {t(errorsMap[error])}
                </FormHelperText>
              )}
              {!sent && (
                <>
                  <TextField
                    label={t`signin.email`}
                    fullWidth
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                  />
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    disabled={!email}
                    onClick={handleSubmit}
                  >
                    {t('signin.login')}
                  </Button>
                  <Typography align="center">{t('signin.or')}</Typography>
                  <LoginGoogle />
                </>
              )}
              {sent && (
                <Typography
                  variant="body2"
                  align="center"
                >{t`signin.check_email`}</Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

const errorsMap = {
  CredentialsSignin: 'signin.errors.CredentialsSignin',
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  else
    return pageUtils.getServerSideProps(async ctx => {
      const error = ctx.query?.error || null;
      const redirectPath = ctx.query?.redirectPath;

      if (redirectPath) {
        const cookies = new Cookies(ctx.req, ctx.res);
        cookies.set('redirectPath', redirectPath);
      }

      return {props: {error}};
    })(context);
};

export default Login;
