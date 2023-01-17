import {useEffect, useState} from 'react';
import {ProfileDocument, UsersPermissionsUser} from '../generated/graphql';
import {initializeApollo} from '../lib/apolloClient';
import {useSession} from 'next-auth/react';

const useProfile = () => {
  const session = useSession();
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState<UsersPermissionsUser | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchProfile = async () => {
    const jwt = session?.data?.token?.jwt;
    const apolloClient = initializeApollo('', jwt);

    try {
      const {data} = await apolloClient.query({
        query: ProfileDocument,
      });
      const fetchedProfile = data?.me?.profile;
      setProfile(fetchedProfile);
      setUserId(data?.me?.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    if (session.status === 'authenticated') fetchProfile();
    else if (session.status === 'unauthenticated') setIsReady(true);
  }, [session]);

  return {
    profile,
    userId,
    connected: session.status === 'authenticated',
    isReady,
  };
};

export default useProfile;
