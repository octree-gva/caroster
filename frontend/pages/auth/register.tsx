import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/Centered';
import Logo from '../../components/Logo';
import SignUpForm from '../../containers/SignUpForm';
import LoginGoogle from '../../containers/LoginGoogle';

const SignUp = () => {
  const {t} = useTranslation();
  return (
    <Layout menuTitle={t('signup.title')} displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <SignUpForm />
        <Divider />
        <LoginGoogle />
      </Card>
    </Layout>
  );
};

export default SignUp;
