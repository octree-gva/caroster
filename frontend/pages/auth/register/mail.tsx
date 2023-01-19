import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {useTranslation} from 'react-i18next';
import Layout from '../../../layouts/Centered';
import MailSignUpForm from '../../../containers/MailSignUpForm';
import Logo from '../../../components/Logo';
import LanguagesIcon from '../../../containers/Languages/Icon';

const MailSignup = () => {
  const {t} = useTranslation();
  return (
    <Layout menuTitle={t('signup.title')} displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <MailSignUpForm />
        <LanguagesIcon />
      </Card>
    </Layout>
  );
};

export async function getServerSideProps(props) {
  return props
}

export default MailSignup;
