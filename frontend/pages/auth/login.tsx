import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/Centered';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import Logo from '../../components/Logo';
import {getSession} from 'next-auth/react';
import pageUtils from '../../lib/pageUtils';
import Cookies from 'cookies';
import LoginForm from '../../containers/LoginForm';

interface Props {
  error?: string;
}

const Login = (props: Props) => {
  const {t} = useTranslation();

  return (
    <Layout menuTitle={t('signin.title')} displayMenu={false}>
      <Container maxWidth="xs">
        <Card sx={{pt: 2, width: '100%'}}>
          <CardMedia component={Logo} />
          <CardContent>
            <Typography variant="h6" align="center">
              {t('signin.title')}
            </Typography>
            <LoginForm error={props.error} showGoogleAuth />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
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
