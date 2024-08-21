import {useTranslation} from 'next-i18next';
import Layout from '../../layouts/Centered';
import LostPasswordContainer from '../../containers/LostPassword';
import pageUtils from '../../lib/pageUtils';

const LostPassword = () => {
  const {t} = useTranslation();

  return (
    <Layout menuTitle={t('lost_password.title')} displayMenu={false}>
      <LostPasswordContainer />
    </Layout>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps();

export default LostPassword;
