import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/Centered';
import LostPasswordContainer from '../../containers/LostPassword';

const LostPassword = () => {
  const {t} = useTranslation();

  return (
    <Layout menuTitle={t('lost_password.title')} displayMenu={false}>
      <LostPasswordContainer />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  return props
}

export default LostPassword;
