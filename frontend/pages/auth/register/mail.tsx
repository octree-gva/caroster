import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
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

export default MailSignup;
