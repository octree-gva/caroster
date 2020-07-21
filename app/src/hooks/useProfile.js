import {useState, useEffect} from 'react';
import {useStrapi, useAuth} from 'strapi-react-context';

export default () => {
  const strapi = useStrapi();
  const {token, authState} = useAuth();
  const [profile, setProfile] = useState();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const fetchedProfile = await strapi.services.users.findOne('me');
        setProfile(fetchedProfile);
      } catch (error) {
        console.error(error);
        setProfile(null);
      }
    };
    if (authState) getProfile();
    else setProfile(null);
  }, [authState, strapi.services.users]);

  const addEvent = async event => {
    try {
      if (!profile)
        throw new Error(`Can't add event to logged user: profile empty`);
      if (!profile?.events?.some(({id}) => id === event.id))
        await strapi.services.users.update('me', {
          events: [...profile.events, event.id],
        });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    profile,
    addEvent,
    connected: !!token,
    user: authState?.user,
    isReady: typeof profile !== 'undefined',
  };
};
