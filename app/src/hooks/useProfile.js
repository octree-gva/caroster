import {useEffect, useState} from 'react';
import {useAuth} from 'strapi-react-context';

export default () => {
  const {token, authState, updateProfile} = useAuth();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(!!token);
  }, [token]);

  const addEvent = async event => {
    if (connected) {
      const {user} = authState;
      const {events} = user;
      updateProfile({
        ...user,
        events: !!events
          ? [...events.filter(e => e !== event.id), event.id]
          : [event.id],
      });
    }
  };

  return {connected, addEvent};
};
