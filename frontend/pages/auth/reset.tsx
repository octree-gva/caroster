import {useState} from 'react';
import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import useToastStore from '../../stores/useToastStore';
import Layout from '../../layouts/Centered';
import ResetPasswordContainer from '../../containers/ResetPassword';
import {useResetPasswordMutation} from '../../generated/graphql';
import pageUtils from '../../lib/pageUtils';

const ResetPassword = () => {
  const router = useRouter();
  const {code} = router.query;
  const addToast = useToastStore(s => s.addToast);
  const {t} = useTranslation();
  const [resetPassword, {loading}] = useResetPasswordMutation();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onReset = async e => {
    if (e.preventDefault) e.preventDefault();
    try {
      await resetPassword({
        variables: {code: code as string, password, passwordConfirmation},
      });
      setPasswordError('');
      addToast(t('lost_password.change_success'));
      router.push('/auth/login');
    } catch (err) {
      if (err.message === 'Bad Request')
        setPasswordError(t('generic.errors.unknown'));
    }
  };

  return (
    <Layout menuTitle={t('lost_password.reset_title')} displayMenu={false}>
      <form onSubmit={onReset}>
        <ResetPasswordContainer
          isLoading={loading}
          password={password}
          setPassword={setPassword}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          error={passwordError}
        />
      </form>
    </Layout>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps();

export default ResetPassword;
