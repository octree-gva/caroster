import {useEffect} from 'react';
import {useRouter} from 'next/router';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import {useTranslation} from 'react-i18next';
import useAuthStore from '../../stores/useAuthStore';
import Layout from '../../layouts/Centered';
import Logo from '../../components/Logo';
import SignInForm from '../../containers/SignInForm';
import LoginGoogle from '../../containers/LoginGoogle';

const Login = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const token = useAuthStore(s => s.token);

  useEffect(() => {
    if (token) router.replace('/dashboard');
  }, [token]);

  return (
    <Layout menuTitle={t('signin.title')} displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <SignInForm />
        <Divider />
        <LoginGoogle />
      </Card>
    </Layout>
  );
};

export default Login;
