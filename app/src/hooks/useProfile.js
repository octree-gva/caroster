import {useMemo, useCallback} from 'react';
import {useAuth} from 'strapi-react-context';

export default () => {
  const {token, authState, updateProfile} = useAuth();

  const connected = useMemo(() => !!token, [token]);

  const user = useMemo(() => authState?.user, [authState]);

  const addEvent = useCallback(
    async event => {
      if (!!token) {
        const {user} = authState;
        const {events} = user;
        updateProfile({
          ...user,
          events: !!events
            ? [...events.filter(e => e !== event.id), event.id]
            : [event.id],
        });
      }
    },
    [token, authState] // eslint-disable-line
  );

  return {connected, user, addEvent};
};
