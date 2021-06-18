import {useState, useEffect} from 'react';
import useAuthStore from '../stores/useAuthStore';
import {useProfileLazyQuery} from '../generated/graphql';

const useProfile = () => {
  const token = useAuthStore(s => s.token);
  const user = useAuthStore(s => s.user);
  const [profile, setProfile] = useState();
  const [fetchProfile, {data}] = useProfileLazyQuery();

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  useEffect(() => {
    if (data) setProfile(data.me?.profile);
  }, [data]);

  // // TODO is useless ?
  // const addEvent = async event => {
  //   try {
  //     if (!profile)
  //       throw new Error(`Can't add event to logged user: profile empty`);
  //     if (!profile?.events?.some(({id}) => id === event.id))
  //       await strapi.services.users.update('me', {
  //         events: [...profile.events, event.id],
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return {
    profile,
    // addEvent,
    connected: !!token,
    user: user,
    isReady: typeof profile !== 'undefined',
  };
};

export default useProfile;
