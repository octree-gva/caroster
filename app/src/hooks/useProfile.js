import {useEffect, useState} from 'react';
import {useStrapi, useAuth} from 'strapi-react-context';

export default () => {
  const strapi = useStrapi();
  const {token, authState} = useAuth();
  const [connected, setConnected] = useState(false);

  const addEvent = async event => {
    if (connected) {
      const {user} = authState;
      const {events = []} = user;
      // TODO: use authState.updateProfile
      await strapi.services.users.update('me', {
        ...user,
        events: [...events.filter(e => e !== event.id), event.id],
      });
    }
  };

  useEffect(() => {
    setConnected(!!token);
  }, [token]);

  return {connected, addEvent};
};
