import LostPasswordContainer from '../../containers/LostPassword';
import Layout from '../../layouts/Centered';
import {useTranslation} from 'react-i18next';

const LostPassword = () => {
  const {t} = useTranslation();

  return (
    <Layout menuTitle={t('lost_password.title')} displayMenu={false}>
      <LostPasswordContainer />
    </Layout>
  );
};

export default LostPassword;
