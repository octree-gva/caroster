import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import Layout from '../../layouts/Centered';
import ResetPasswordContainer from '../../containers/ResetPassword';
import useToastStore from '../../stores/useToastStore';
import {useResetPasswordMutation} from '../../generated/graphql';

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

export default ResetPassword;
