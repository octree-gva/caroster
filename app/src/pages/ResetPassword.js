import React, {useState} from 'react';
import {useLocation, useHistory, Redirect} from 'react-router-dom';
import {useAuth} from 'strapi-react-context';
import NotFound from './NotFound';
import ResetPasswordContainer from '../containers/ResetPassword';
import Layout from '../layouts/Centered';
import {useTranslation} from 'react-i18next';
import {useToast} from '../contexts/Toast';

const ResetPassword = () => {
  const {resetPassword, token} = useAuth();
  const {search} = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const {addToast} = useToast();
  const {t} = useTranslation();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const code = new URLSearchParams(search).get('code');

  const onReset = async evt => {
    if (evt.preventDefault) evt.preventDefault();
    setIsLoading(true);
    try {
      await resetPassword(code, password, passwordConfirmation);
      setPasswordError('');
      addToast(t('forgot_password.change_success'));
      history.push('/login');
    } catch (err) {
      if (err.kind === 'bad_data') {
        setPasswordError(t('generic.errors.unknown'));
      }
    }
    setIsLoading(false);
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }

  if (!code) {
    return <NotFound />;
  }

  return (
    <Layout menuTitle={t('lost_password.reset_title')}>
      <form onSubmit={onReset}>
        <ResetPasswordContainer
          isLoading={isLoading}
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
