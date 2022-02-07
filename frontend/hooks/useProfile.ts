import {useEffect, useState} from 'react';
import useAuthStore from '../stores/useAuthStore';
import {useProfileLazyQuery} from '../generated/graphql';

const useProfile = () => {
  const token = useAuthStore(s => s.token);
  const user = useAuthStore(s => s.user);
  const [isReady, setIsReady] = useState(false);
  const [
    fetchProfile,
    {data: {me: {profile = null} = {}} = {}},
  ] = useProfileLazyQuery({
    onCompleted: () => setIsReady(true),
  });

  useEffect(() => {
    if (profile) setIsReady(true);
    else if (token) fetchProfile();
    else setIsReady(true);
  }, [token, profile]);

  return {
    profile,
    connected: !!token,
    user: user,
    isReady,
  };
};

export default useProfile;
