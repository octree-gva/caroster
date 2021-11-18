import {useState, useEffect} from 'react';
import useAuthStore from '../stores/useAuthStore';
import {useProfileLazyQuery} from '../generated/graphql';

const useProfile = () => {
  const token = useAuthStore(s => s.token);
  const user = useAuthStore(s => s.user);
  const [profile, setProfile] = useState(undefined);
  const [fetchProfile, {data}] = useProfileLazyQuery();

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  useEffect(() => {
    if (data) setProfile(data.me?.profile);
    else setProfile(null);
  }, [data]);

  return {
    profile,
    connected: !!token,
    user: user,
    notReady: typeof profile === 'undefined',
  };
};

export default useProfile;
