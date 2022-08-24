import {useEffect, useState} from 'react';
import useAuthStore from '../stores/useAuthStore';
import {ProfileDocument, UsersPermissionsUser} from '../generated/graphql';
import {initializeApollo} from '../lib/apolloClient';

const useProfile = () => {
  const token = useAuthStore(s => s.token);
  const user = useAuthStore(s => s.user);
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState<UsersPermissionsUser | null>(null);

  const fetchProfile = async () => {
    const apolloClient = initializeApollo({});

    try {
      const {data} = await apolloClient.query({
        query: ProfileDocument,
      });
      const fetchedProfile = data?.me?.profile;
      setProfile(fetchedProfile);
    } catch (error) {
      console.error(error);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    if (profile) setIsReady(true);
    else if (token) fetchProfile();
    else setIsReady(true);
  }, [token, profile]);

  return {
    profile,
    connected: !!token,
    user,
    isReady,
  };
};

export default useProfile;
