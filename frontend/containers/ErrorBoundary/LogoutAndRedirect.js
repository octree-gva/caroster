import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useAuth} from 'strapi-react-context';

const LogoutAndRedirect = () => {
  const {logout, token} = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  if (token) return null;
  return <Redirect to="/" />;
};

export default LogoutAndRedirect;
