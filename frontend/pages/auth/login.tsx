import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {getSession} from 'next-auth/react';
import {useTranslation} from 'next-i18next';
import Layout from '../../layouts/Centered';
import Logo from '../../components/Logo';
import SignInForm from '../../containers/SignInForm';
import LanguagesIcon from '../../containers/Languages/Icon';
import pageUtils from '../../lib/pageUtils';
import Container from '@mui/material/Container';
import Cookies from 'cookies';

interface PageProps {
  error?: string;
  emailConfirmation?: boolean;
}

const Login = (props: PageProps) => {
  const {emailConfirmation} = props;
  const {t} = useTranslation();

  return (
    <Layout menuTitle={t('signin.title')} displayMenu={false}>
      <Container maxWidth="xs">
        <Card sx={{pt: 2, width: '100%'}}>
          <CardMedia component={Logo} />
          {emailConfirmation && (
            <Typography
              sx={{p: 2}}
              variant="body2"
              align="center"
            >{t`signin.emailConfirmation`}</Typography>
          )}
          <SignInForm error={props?.error} />
        </Card>
      </Container>
      <LanguagesIcon />
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
      const emailConfirmation = ctx.query?.confirmed === 'true';
      const redirectPath = ctx.query?.redirectPath;

      if (redirectPath) {
        const cookies = new Cookies(ctx.req, ctx.res);
        cookies.set('redirectPath', redirectPath);
      }

      return {props: {error, emailConfirmation}};
    })(context);
};

export default Login;
