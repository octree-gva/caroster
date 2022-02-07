import useAuthStore from '../stores/useAuthStore';

const useLoginWithProvider = () => {
  const setToken = useAuthStore(s => s.setToken);
  const setUser = useAuthStore(s => s.setUser);

  const loginWithProvider = async (provider: string, search: string) => {
    const resultRaw = await fetch(`/auth/${provider}/callback${search}`);
    const result = await resultRaw.json();
    if (result.hasOwnProperty('error')) throw result;
    setToken(result.jwt);
    setUser(result.user);
    return result;
  };

  return {loginWithProvider};
};

export default useLoginWithProvider;
