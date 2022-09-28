import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/Centered';
import Logo from '../../components/Logo';
import SignInForm from '../../containers/SignInForm';
import LoginGoogle from '../../containers/LoginGoogle';
import LanguagesIcon from '../../containers/Languages/Icon';
import {getSession} from 'next-auth/react';
import pageUtils from '../../lib/pageUtils';

interface PageProps {
  error?: string;
}

const Login = (props: PageProps) => {
  const {t} = useTranslation();

  return (
    <Layout menuTitle={t('signin.title')} displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <SignInForm error={props?.error} />
        <Divider />
        <LoginGoogle />
      </Card>
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
      return {props: {error}};
    })(context);
};

export default Login;
